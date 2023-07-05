import { BaseQueryDto } from '@core/global/dto';
import { OmitType } from '@nestjs/mapped-types';
import { IsOptional, IsString } from 'class-validator';

export class CategoryQueryDto extends BaseQueryDto {
  @IsString()
  @IsOptional()
  parent?: string;

  @IsString()
  @IsOptional()
  public?: string;
}

export class SubCategoryQueryDto extends OmitType(CategoryQueryDto, [
  'parent',
]) {}
