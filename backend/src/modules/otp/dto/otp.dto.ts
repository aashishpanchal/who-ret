import { IsNotEmpty, IsString } from 'class-validator';

export class OtpDto {
  @IsString()
  @IsNotEmpty()
  phone: string;

  @IsString()
  @IsNotEmpty()
  otp: string;

  @IsString()
  @IsNotEmpty()
  hash: string;
}
