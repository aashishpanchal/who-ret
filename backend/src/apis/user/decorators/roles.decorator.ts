import { ROLE } from '../enums';
import { SetMetadata } from '@nestjs/common';

export const Roles = (...roles: ROLE[]) => SetMetadata('roles', roles);
