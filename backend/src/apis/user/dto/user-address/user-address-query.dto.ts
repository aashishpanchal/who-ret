import { BaseQueryWithUserDto } from '@core/global/dto';
import { PartialType } from '@nestjs/mapped-types';

export class UserAddressQueryDto extends PartialType(BaseQueryWithUserDto) {}
