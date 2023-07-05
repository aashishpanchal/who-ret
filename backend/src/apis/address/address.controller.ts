import {
  Controller,
  Put,
  Get,
  Post,
  Body,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AtGuard } from '../auth';
import { ROLE, Roles } from '../user';
import { AddressService } from './address.service';
import { ParseObjectIdPipe } from '@/core/global/pipes';
import { AddressQueryDto, CreateAddressDto, UpdateAddressDto } from './dto';

@Controller('api/addresses')
@UseGuards(AtGuard)
export class AddressController {
  constructor(private readonly addressService: AddressService) {}

  @Post()
  @Roles(ROLE.ADMIN)
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createAddressDto: CreateAddressDto) {
    return this.addressService.create(createAddressDto);
  }

  @Get()
  @Roles(ROLE.ADMIN)
  findAll(@Query() query: AddressQueryDto) {
    return this.addressService.findAll(query);
  }

  @Put(':id')
  @Roles(ROLE.ADMIN)
  update(
    @Param('id', ParseObjectIdPipe) id: string,
    @Body() updateAddressDto: UpdateAddressDto,
  ) {
    return this.addressService.update(id, updateAddressDto);
  }

  @Get(':id')
  @Roles(ROLE.ADMIN)
  findById(@Param('id', ParseObjectIdPipe) id: string) {
    return this.addressService.findById(id);
  }

  @Delete(':id')
  @Roles(ROLE.ADMIN)
  remove(@Param('id', ParseObjectIdPipe) id: string) {
    return this.addressService.remove(id);
  }
}
