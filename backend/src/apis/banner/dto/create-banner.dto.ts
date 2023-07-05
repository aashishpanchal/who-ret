import * as Joi from 'joi';
import { Transform } from 'class-transformer';
import { IsBoolean, IsOptional, IsString } from 'class-validator';

export class CreateBannerDto {
  @IsBoolean()
  @IsOptional()
  @Transform(({ value }) => Joi.boolean().validate(value).value)
  public: boolean;

  @IsString()
  @IsOptional()
  description: string;
}
