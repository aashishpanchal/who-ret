import { Transform } from 'class-transformer';
import { IsNumber, IsPositive, IsOptional, IsString } from 'class-validator';

export class BaseQueryDto {
  @IsOptional()
  @IsString()
  search?: string;

  @IsOptional()
  @IsString()
  sort?: string;

  @IsOptional()
  @IsNumber()
  @IsPositive()
  @Transform(({ value }) => parseInt(value))
  page?: number;

  @IsOptional()
  @IsNumber()
  @IsPositive()
  @Transform(({ value }) => parseInt(value))
  size?: number;
}
