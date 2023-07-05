import { PickType } from '@nestjs/mapped-types';
import { IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateKycDto {
  @IsString()
  @IsNotEmpty()
  abnNumber: string;

  @IsOptional()
  @IsBoolean()
  isVerify: boolean;
}

// Me for current user on retailer side
export class MeCreateKycDto extends PickType(CreateKycDto, ['abnNumber']) {}
