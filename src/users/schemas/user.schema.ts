import { Schema } from 'mongoose';
import { User } from '@users/interfaces/user.interface';
import { BOOLEAN, NUMBER, STRING, STRING_REQUIRED } from '../../utils/models';

/*export type UserDocument = HydratedDocument<User>;

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

export const UserSchema = SchemaFactory.createForClass(User);*/

export const UserSchema = new Schema<User>({
  username: { ...STRING_REQUIRED },

  password: { ...STRING_REQUIRED },

  email: { ...STRING_REQUIRED },

  picture: { ...STRING },

  score: { ...NUMBER },

  rank: { ...NUMBER },

  badges: [{ ...STRING }],

  coinsBonus: { ...NUMBER },

  admin: { ...BOOLEAN },
});
