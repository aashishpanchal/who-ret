import { queryTransForm } from '@modules/query/dto';
import { Serialize } from '@core/global/interceptors';
import { AtGuard, RoleGuard } from '@apis/auth/guards';
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import {
  CreateUserDto,
  MeUpdateDto,
  UpdateUserDto,
  UserDto,
  UserQueryDto,
} from '../dto';
import { ROLE } from '../enums';
import { Roles } from '../decorators';
import { UserDocument } from '../models';
import { UserService } from '../services';
import { GetUser } from '@apis/auth/decorators';
import { ParseObjectIdPipe } from '@core/global/pipes';

@Controller('api/users')
@UseGuards(AtGuard, RoleGuard)
@Serialize(queryTransForm(UserDto))
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @Roles(ROLE.ADMIN)
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createUserDto: CreateUserDto) {
    return await this.userService.create(createUserDto);
  }

  @Get()
  @Roles(ROLE.ADMIN)
  findAll(@Query() query: UserQueryDto) {
    return this.userService.findAll(query);
  }

  // normal user access
  @Get('me')
  me(@GetUser() user: UserDocument) {
    return user.toJSON();
  }

  @Put('me')
  meUpdate(@GetUser() user: UserDocument, @Body() updateUserDto: MeUpdateDto) {
    return this.userService.update(user._id.toString(), updateUserDto);
  }

  @Get(':id')
  @Roles(ROLE.ADMIN)
  findOne(@Param('id', ParseObjectIdPipe) id: string) {
    return this.userService.findById(id);
  }

  @Put(':id')
  @Roles(ROLE.ADMIN)
  update(
    @Param('id', ParseObjectIdPipe) id: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.userService.update(id, updateUserDto);
  }

  @Delete(':id')
  @Roles(ROLE.ADMIN)
  remove(@Param('id', ParseObjectIdPipe) id: string) {
    return this.userService.remove(id);
  }
}
