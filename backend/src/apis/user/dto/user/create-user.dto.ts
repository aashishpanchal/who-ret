import {
  IsBoolean,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsMobilePhone,
  IsString,
  MinLength,
  Matches,
} from 'class-validator';
import { ROLE } from '@apis/user/enums';

export class KycDto {
  @IsString()
  @IsNotEmpty()
  abnNumber: string;

  @IsOptional()
  @IsBoolean()
  isVerify: boolean;
}

export class CreateUserDto {
  @IsMobilePhone(
    'en-AU',
    { strictMode: true },
    { message: 'Please enter valid phone number.' },
  )
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

  @MinLength(8, { message: 'Password must have length of at least 8' })
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[a-z]).*$/, {
    message: 'Password must contain at least 1 number and 1 letter',
  })
  @IsString()
  @IsNotEmpty()
  password: string;

  @IsEnum(ROLE)
  @IsOptional()
  role?: ROLE;

  @IsBoolean()
  @IsOptional()
  isActive?: boolean;

  @IsBoolean()
  @IsOptional()
  isPhoneVerify?: boolean;

  @IsBoolean()
  @IsOptional()
  isEmailVerify?: boolean;
}
