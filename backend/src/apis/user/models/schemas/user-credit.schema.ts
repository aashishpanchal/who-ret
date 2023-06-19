import { HydratedDocument, Model, Types } from 'mongoose';
import { CREDIT } from '../../constants';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { User, UserDocument } from './user.schema';

@Schema({ timestamps: true })
export class UserCredit {
  @Prop({ type: Types.ObjectId, ref: User.name, required: true })
  user: Types.ObjectId | UserDocument;

  @Prop({ default: CREDIT })
  credit: number;

  @Prop({ default: 0 })
  subtract_credit: number;
}

export type UserCreditDocument = HydratedDocument<UserCredit>;

export type UserCreditModel = Model<UserCredit>;

export const UserCreditSchema = SchemaFactory.createForClass(UserCredit);
