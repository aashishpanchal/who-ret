import { PickType } from '@nestjs/mapped-types';
import {
  IsBoolean,
  IsMongoId,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateUserKycDto {
  @IsString()
  @IsNotEmpty()
  abnNumber: string;

  @IsMongoId()
  @IsNotEmpty()
  user: string;

  @IsOptional()
  @IsBoolean()
  isVerify: boolean;
}

// Me for current user on retailer side
export class MeCreateKycDto extends PickType(CreateUserKycDto, ['abnNumber']) {}
