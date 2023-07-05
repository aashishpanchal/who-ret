import { BaseQueryDto } from '@core/global/dto';
import { IsOptional, IsString } from 'class-validator';

// banner query
export class BannerQueryDto extends BaseQueryDto {
  @IsString()
  @IsOptional()
  public?: string;
}
