import { User, UserDocument } from './user.schema';
import { HydratedDocument, Model, Types } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class UserAddress {
  @Prop({ type: Types.ObjectId, ref: User.name, required: true })
  user: Types.ObjectId | UserDocument;

  @Prop({ required: true })
  fullName: string;

  @Prop({ required: true })
  phone: string;

  @Prop({ required: true })
  address: string;

  @Prop({ required: true })
  city: string;

  @Prop({ required: true })
  country: string;

  @Prop({ required: true })
  state: string;

  @Prop({ required: true })
  postalCode: string;
}

export type UserAddressDocument = HydratedDocument<UserAddress>;

export type UserAddressModel = Model<UserAddress>;

export const UserAddressSchema = SchemaFactory.createForClass(UserAddress);
