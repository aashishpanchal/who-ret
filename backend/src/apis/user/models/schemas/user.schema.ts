import { ROLE } from '../../enums';
import { compare, hash } from 'bcrypt';
import { HydratedDocument, Model } from 'mongoose';
import { Schema, SchemaFactory, Prop } from '@nestjs/mongoose';

@Schema({ timestamps: true })
export class User {
  @Prop({ required: true, unique: true })
  phone: string;

  @Prop()
  email: string;

  @Prop()
  first_name: string;

  @Prop()
  last_name: string;

  @Prop({ select: false })
  password: string;

  @Prop({
    type: String,
    enum: Object.values(ROLE),
    default: ROLE.RETAILER,
  })
  role: ROLE;

  @Prop({ default: true })
  isActive: boolean;

  @Prop({ default: false })
  isSuperuser: boolean;

  @Prop()
  loginAt: Date;

  // methods
  isValidPassword: (password: string) => Promise<boolean>;
}

export type UserDocument = HydratedDocument<User>;

export type UserModel = Model<User>;

export const UserSchema = SchemaFactory.createForClass(User);

// middlewares
UserSchema.pre('save', async function (next: Function) {
  if (this.password) {
    if (!this?.isModified('password')) return next();
    const hashedPassword = await hash(this.password, 10);
    this.password = hashedPassword;
  }
  next();
});

UserSchema.method('isValidPassword', async function (password: string) {
  if (this.password) return await compare(password, this.password);
  return false;
});
