import { Schema } from 'mongoose';
import { User } from '@users/interfaces/user.interface';
import { BOOLEAN, NUMBER, STRING, STRING_REQUIRED } from '@utils/models';

export const UserSchema = new Schema<User>({
  username: { ...STRING_REQUIRED, unique: true },

  password: { ...STRING_REQUIRED },

  email: { ...STRING_REQUIRED, unique: true },

  picture: { ...STRING },

  score: { ...NUMBER },

  rank: { ...NUMBER },

  badges: [{ ...STRING }],

  coinsBonus: { ...NUMBER },

  admin: { ...BOOLEAN },
});
