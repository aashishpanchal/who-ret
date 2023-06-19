import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto, UpdateUserDto } from '../dto';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserModel } from '../models';
import { UserMsgs } from '../constants';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private readonly userModel: UserModel) {}

  async create(createUserDto: CreateUserDto) {
    const { phone } = createUserDto;

    if (await this.userModel.findOne({ phone })) {
      throw new BadRequestException(UserMsgs.PHONE_NUM_ALREADY_USE);
    }

    return await this.userModel.create(createUserDto);
  }

  async findOne(phone: string) {
    return await this.userModel.findOne({ phone }, '+password');
  }

  async findById(id: string) {
    const user = await this.userModel.findById(id);
    if (!user) throw new NotFoundException(UserMsgs.USER_NOT_FOUND_BY_ID);
    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const updateUser = await this.userModel.findByIdAndUpdate(
      id,
      updateUserDto,
      { new: true },
    );

    if (!updateUser)
      throw new BadRequestException(UserMsgs.USER_NOT_FOUND_BY_ID);

    return updateUser;
  }

  async remove(id: string) {
    const removeUser = await this.userModel.findByIdAndRemove(id);

    if (!removeUser)
      throw new BadRequestException(UserMsgs.USER_NOT_FOUND_BY_ID);

    return removeUser;
  }
}
