import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
  User,
  UserAddress,
  UserAddressSchema,
  UserCredit,
  UserKyc,
  UserKycSchema,
  UserSchema,
} from './schemas';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: UserAddress.name, schema: UserAddressSchema },
      { name: UserKyc.name, schema: UserKycSchema },
      { name: UserCredit.name, schema: UserKycSchema },
    ]),
  ],
  exports: [MongooseModule],
})
export class ModelModule {}
