import { CreateUserDto } from '@apis/user/dto';
import { PickType } from '@nestjs/mapped-types';
import { IsNotEmpty, IsString } from 'class-validator';

export class LoginDto extends PickType(CreateUserDto, ['phone', 'password']) {
  @IsString()
  @IsNotEmpty()
  password: string;
}
