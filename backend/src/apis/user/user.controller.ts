import { queryTransForm } from '@modules/query/dto';
import { Serialize } from '@core/global/interceptors';
import { AtGuard } from '@apis/auth/guards';
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
import { ROLE } from './enums';
import { Roles } from './decorators';
import { UserDocument } from './models';
import { UserService } from './user.service';
import { GetUser, GetUserId } from '@apis/auth/decorators';
import { ParseObjectIdPipe } from '@core/global/pipes';
import {
  CreateUserDto,
  MeCreateKycDto,
  MeUpdateDto,
  UpdateUserDto,
  UserDto,
  UserQueryDto,
} from './dto';

@UseGuards(AtGuard)
@Controller('api/users')
@Serialize(queryTransForm(UserDto))
export class UserController {
  constructor(private readonly userService: UserService) {}

  // normal user access
  @Get('me')
  me(@GetUser() user: UserDocument) {
    return user.toJSON();
  }

  @Put('me')
  meUpdate(@GetUser() user: UserDocument, @Body() updateUserDto: MeUpdateDto) {
    return this.userService.update(user._id.toString(), updateUserDto);
  }

  @Post('me/abn-number')
  meAbnNumberAdd(
    @GetUserId() userId: string,
    @Body() { abnNumber }: MeCreateKycDto,
  ) {
    return this.userService.addAbnNumber(userId, abnNumber);
  }

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
