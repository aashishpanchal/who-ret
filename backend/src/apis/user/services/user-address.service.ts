import { QueryService } from '@modules/query';
import { InjectModel } from '@nestjs/mongoose';
import { UserAddress, UserAddressModel } from '../models';
import { Injectable, NotFoundException } from '@nestjs/common';
import {
  CreateUserAddressDto,
  UpdateUserAddressDto,
  UserAddressQueryDto,
} from '../dto';
import { UserMsgs } from '../constants';

@Injectable()
export class UserAddressService {
  constructor(
    private readonly queryService: QueryService,
    @InjectModel(UserAddress.name)
    private readonly userAddressModel: UserAddressModel,
  ) {}

  async create(createUserAddressDto: CreateUserAddressDto) {
    return this.userAddressModel.create(createUserAddressDto);
  }

  async findAll({ page, search, size, user, ...others }: UserAddressQueryDto) {
    return this.queryService
      .search(['address', 'city', 'state', 'postalCode'], search)
      .keyValue('user', user)
      .sort(others.sort)
      .excModelWithPaginate({ page, size }, this.userAddressModel);
  }

  async findById(id: string) {
    const address = await this.userAddressModel.findById(id);
    if (!address) throw new NotFoundException(UserMsgs.address_not_found);
    return address;
  }

  async update(id: string, updateAddressDto: UpdateUserAddressDto) {
    const updateAddress = await this.userAddressModel.findByIdAndUpdate(
      id,
      updateAddressDto,
      {
        new: true,
      },
    );
    if (!updateAddress) throw new NotFoundException(UserMsgs.address_not_found);

    return updateAddress;
  }

  async remove(id: string) {
    const removeAddress = await this.userAddressModel.findByIdAndRemove(id);

    if (!removeAddress) throw new NotFoundException(UserMsgs.address_not_found);

    return removeAddress;
  }
}
