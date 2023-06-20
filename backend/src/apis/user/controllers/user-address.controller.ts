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
import { ROLE } from '../enums';
import { Roles } from '../decorators';
import {
  CreateUserAddressDto,
  UpdateUserAddressDto,
  UserAddressQueryDto,
} from '../dto';
import { UserAddressService } from '../services';
import { AtGuard, RoleGuard } from '@apis/auth/guards';
import { ParseObjectIdPipe } from '@core/global/pipes';

@Controller('api/user-address')
@UseGuards(AtGuard, RoleGuard)
export class UserAddressController {
  constructor(private readonly userAddressService: UserAddressService) {}

  @Post()
  @Roles(ROLE.ADMIN)
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createUserAddressDto: CreateUserAddressDto) {
    return this.userAddressService.create(createUserAddressDto);
  }

  @Get()
  @Roles(ROLE.ADMIN)
  findAll(@Query() query: UserAddressQueryDto) {
    return this.userAddressService.findAll(query);
  }

  @Put(':id')
  @Roles(ROLE.ADMIN)
  update(
    @Param('id', ParseObjectIdPipe) id: string,
    @Body() updateUserAddressDto: UpdateUserAddressDto,
  ) {
    return this.userAddressService.update(id, updateUserAddressDto);
  }

  @Get(':id')
  @Roles(ROLE.ADMIN)
  findById(@Param('id', ParseObjectIdPipe) id: string) {
    return this.userAddressService.findById(id);
  }

  @Delete(':id')
  @Roles(ROLE.ADMIN)
  remove(@Param('id', ParseObjectIdPipe) id: string) {
    return this.userAddressService.remove(id);
  }
}
