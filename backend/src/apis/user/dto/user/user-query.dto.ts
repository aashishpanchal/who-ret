import { BaseQueryDto } from '@core/global/dto';
import { IsOptional, IsString } from 'class-validator';

export class UserQueryDto extends BaseQueryDto {
  @IsString()
  @IsOptional()
  role?: string;

  @IsString()
  @IsOptional()
  isActive?: string;
}
