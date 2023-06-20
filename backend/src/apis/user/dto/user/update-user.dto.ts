import { OmitType, PartialType, PickType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(
  OmitType(CreateUserDto, ['password']),
) {}

// Me for current user on retailer side
export class MeUpdateDto extends PartialType(
  PickType(UpdateUserDto, ['firstName', 'lastName']),
) {}
