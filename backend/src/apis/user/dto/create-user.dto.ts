import {
  IsBoolean,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsMobilePhone,
  IsString,
} from 'class-validator';
import { ROLE } from '../enums';

export class CreateUserDto {
  @IsMobilePhone('en-AU', { strictMode: true })
  @IsNotEmpty()
  phone: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsOptional()
  firstName?: string;

  @IsString()
  @IsOptional()
  lastName?: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsEnum(ROLE)
  @IsOptional()
  role: ROLE;

  @IsBoolean()
  @IsOptional()
  isSuperuser: boolean;

  @IsBoolean()
  @IsOptional()
  isActive: boolean;
}
