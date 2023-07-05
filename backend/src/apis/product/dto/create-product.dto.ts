import { GST } from '../enums';
import { Type } from 'class-transformer';
import { ExpireDateValidator } from '@core/global/validator';
import {
  IsInt,
  IsDate,
  IsArray,
  IsNumber,
  IsString,
  Validate,
  IsBoolean,
  IsMongoId,
  IsNotEmpty,
  IsOptional,
  IsPositive,
  ValidateNested,
  IsEnum,
} from 'class-validator';

export class CreatePackDTO {
  @IsNumber()
  @IsNotEmpty()
  numOfProduct: number;

  @IsNumber()
  @IsNotEmpty()
  deductionPrice: number;

  @IsBoolean()
  @IsNotEmpty()
  public: boolean;
}

export class CreateProductDto {
  @IsMongoId()
  @IsOptional()
  user: string;

  @IsMongoId()
  @IsNotEmpty()
  category: string;

  @IsString()
  @IsMongoId()
  @IsOptional()
  subcategory: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsBoolean()
  @IsOptional()
  public?: boolean;

  @IsNumber()
  @IsNotEmpty()
  mrp?: number;

  @IsDate()
  @IsOptional()
  @Type(() => Date)
  @Validate(ExpireDateValidator)
  expire?: Date;

  @IsInt()
  @IsPositive()
  @IsOptional()
  stock?: number;

  @IsInt()
  @IsPositive()
  @IsOptional()
  discount?: number;

  @IsString()
  @IsEnum(GST)
  @IsOptional()
  gst?: GST;

  @IsString()
  @IsOptional()
  description?: string;

  @IsArray()
  @IsOptional()
  @IsString({ each: true })
  keywords?: string[];

  @IsArray()
  @IsNotEmpty()
  @ValidateNested()
  @Type(() => CreatePackDTO)
  pack?: CreatePackDTO[];
}
