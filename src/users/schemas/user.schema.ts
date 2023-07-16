import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  @Prop({ required: true })
  username: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true })
  email: string;

  @Prop()
  picture: string;

  @Prop()
  score: number;

  @Prop()
  rank: number;

  @Prop()
  badges: string[];

  @Prop()
  coinsBonus: number;

  @Prop()
  admin: boolean;
}

export const UserSchema = SchemaFactory.createForClass(User);
