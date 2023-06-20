import { PartialType } from '@nestjs/mapped-types';
import { CreateUserKycDto } from './create-user-kyc.dto';

export class UpdateUserKycDto extends PartialType(CreateUserKycDto) {}
