import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UserMsgs } from './constants';
import { User, UserModel } from './models';
import { QueryService } from '@modules/query';
import { InjectModel } from '@nestjs/mongoose';
import { CreateUserDto, UpdateUserDto, UserQueryDto } from './dto';

@Injectable()
export class UserService {
  constructor(
    private readonly queryService: QueryService,
    @InjectModel(User.name) private readonly userModel: UserModel,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const { phone } = createUserDto;

    if (await this.userModel.findOne({ phone })) {
      throw new BadRequestException(UserMsgs.phone_num_already_use);
    }

    return await this.userModel.create(createUserDto);
  }

  async findByPhone(phone: string) {
    return await this.userModel.findOne({ phone }, '+password');
  }

  async findById(id: string) {
    const user = await this.userModel.findById(id);
    if (!user) throw new NotFoundException(UserMsgs.user_not_found_by_id);
    return user;
  }

  async findAll({ page, search, size, ...others }: UserQueryDto) {
    return this.queryService
      .search(['phone', 'abnNumber', 'email'], search)
      .keyValue('role', others.role)
      .keyValue('isActive', others.isActive)
      .sort(others.sort)
      .excModelWithPaginate({ page, size }, this.userModel);
  }

  async update(id: string, updateUserDto: Partial<UpdateUserDto>) {
    const updateUser = await this.userModel.findByIdAndUpdate(
      id,
      updateUserDto,
      { new: true },
    );

    if (!updateUser)
      throw new BadRequestException(UserMsgs.user_not_found_by_id);

    return updateUser;
  }

  async remove(id: string) {
    const removeUser = await this.userModel.findByIdAndRemove(id);

    if (!removeUser)
      throw new BadRequestException(UserMsgs.user_not_found_by_id);

    return removeUser;
  }

  async addAbnNumber(userId: string, abnNumber: string) {
    const user = await this.findById(userId);

    if (user.isAbnVerify) return user;

    user.abnNumber = abnNumber;

    return user.save();
  }
}
