import { BaseQueryDto } from '@core/global/dto';
import { IsMongoId, IsOptional } from 'class-validator';

export class ProductQueryDto extends BaseQueryDto {
  @IsMongoId()
  @IsOptional()
  user: string;

  @IsMongoId()
  @IsOptional()
  brand: string;

  @IsMongoId()
  @IsOptional()
  category: string;

  @IsMongoId()
  @IsOptional()
  subcategory: string;

  @IsOptional()
  public?: string;
}
