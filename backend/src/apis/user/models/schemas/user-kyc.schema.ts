import { User, UserDocument } from './user.schema';
import { HydratedDocument, Model, Types } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ timestamps: true })
export class UserKyc {
  @Prop({ type: Types.ObjectId, ref: User.name, required: true, unique: true })
  user: Types.ObjectId | UserDocument;

  @Prop({ required: true })
  abnNumber: string;

  @Prop({ default: false })
  isVerify: boolean;

  @Prop()
  verifiedAt: Date;
}

export type UserKycDocument = HydratedDocument<UserKyc>;

export type UserKycModel = Model<UserKyc>;

export const UserKycSchema = SchemaFactory.createForClass(UserKyc);

// middlewares
UserKycSchema.pre('save', async function (next: Function) {
  if (this.isVerify) {
    if (!this?.isModified('isVerify')) return next();
    this.verifiedAt = new Date();
  }
  next();
});
