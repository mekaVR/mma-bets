import { Schema } from 'mongoose';
import { User } from '@users/interfaces/user.interface';
import { BOOLEAN, NUMBER, STRING, STRING_REQUIRED } from '@utils/models';

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
