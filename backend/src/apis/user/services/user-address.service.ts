import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateUserDto, UpdateUserDto } from '../dto';
import { UserAddress, UserAddressModel } from '../models';

@Injectable()
export class UserAddressService {
  constructor(
    @InjectModel(UserAddress.name)
    private readonly userAddressModel: UserAddressModel,
  ) {}

  create(createUserDto: CreateUserDto) {
    return 'This action adds a new user';
  }

  findAll() {
    return `This action returns all user`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
