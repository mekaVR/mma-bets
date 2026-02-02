import { Schema } from 'mongoose';
import { User } from '@users/interfaces/user.interface';

export const UserSchema = new Schema<User>(
  {
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    picture: { type: String },
    score: { type: Number, default: 0 },
    rank: { type: Number },
    badges: [{ type: String }],
    coinsBonus: { type: Number, default: 0 },
    admin: { type: Boolean, default: false },
  },
  { timestamps: true },
);
