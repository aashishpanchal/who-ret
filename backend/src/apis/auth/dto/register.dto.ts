import { CreateUserDto } from '@apis/user/dto';
import { PickType } from '@nestjs/mapped-types';

export class RegisterDto extends PickType(CreateUserDto, [
  'phone',
  'email',
  'password',
]) {}
