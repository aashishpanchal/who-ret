import { PartialType } from '@nestjs/mapped-types';
import { BaseQueryDto } from './base-query.dto';
import { IsMongoId, IsOptional } from 'class-validator';

export class BaseQueryWithUserDto extends PartialType(BaseQueryDto) {
  @IsMongoId()
  @IsOptional()
  user?: string;
}
