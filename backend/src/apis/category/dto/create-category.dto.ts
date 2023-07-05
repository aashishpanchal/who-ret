import * as Joi from 'joi';
import { Transform } from 'class-transformer';
import { IsString, IsNotEmpty, IsBoolean, IsOptional } from 'class-validator';

export class CreateCategoryDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsBoolean()
  @IsOptional()
  @Transform(({ value }) => Joi.boolean().validate(value).value)
  public: boolean;

  @IsString()
  @IsOptional()
  description: string;
}
