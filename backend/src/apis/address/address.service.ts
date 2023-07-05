import { MSG } from './constants';
import { QueryService } from '@modules/query';
import { InjectModel } from '@nestjs/mongoose';
import { Address, AddressModel } from './models';
import { Injectable, NotFoundException } from '@nestjs/common';
import { AddressQueryDto, CreateAddressDto, UpdateAddressDto } from './dto';

@Injectable()
export class AddressService {
  constructor(
    private readonly queryService: QueryService,
    @InjectModel(Address.name) private readonly addressModel: AddressModel,
  ) {}

  async create(createAddressDto: CreateAddressDto) {
    return this.addressModel.create(createAddressDto);
  }

  async findAll({ page, search, size, user, ...others }: AddressQueryDto) {
    return this.queryService
      .search(['address', 'city', 'state', 'postalCode'], search)
      .keyValue('user', user)
      .sort(others.sort)
      .excModelWithPaginate({ page, size }, this.addressModel);
  }

  async findById(id: string) {
    const address = await this.addressModel.findById(id);
    if (!address) throw new NotFoundException(MSG.address_not_found);
    return address;
  }

  async update(id: string, updateAddressDto: UpdateAddressDto) {
    const updateAddress = await this.addressModel.findByIdAndUpdate(
      id,
      updateAddressDto,
      {
        new: true,
      },
    );
    if (!updateAddress) throw new NotFoundException(MSG.address_not_found);

    return updateAddress;
  }

  async remove(id: string) {
    const removeAddress = await this.addressModel.findByIdAndRemove(id);

    if (!removeAddress) throw new NotFoundException(MSG.address_not_found);

    return removeAddress;
  }
}
