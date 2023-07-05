import { PartialType } from '@nestjs/mapped-types';
import { BaseQueryWithUserDto } from '@core/global/dto';

export class AddressQueryDto extends PartialType(BaseQueryWithUserDto) {}
