import { Document } from 'mongoose';

export interface IUser {
  username: string;
  email: string;
  password: string;
  picture?: string;
  score?: number;
  rank?: number;
  badges?: string[];
  coinsBonus?: number;
  admin?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export type User = IUser & Document;
