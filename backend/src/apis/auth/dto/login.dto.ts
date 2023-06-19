import { CreateUserDto } from '@apis/user/dto';
import { PickType } from '@nestjs/mapped-types';

export class LoginDto extends PickType(CreateUserDto, ['phone', 'password']) {}
