import { Document, Types } from 'mongoose';

export interface IFight {
  date: Date;
  event: Types.ObjectId;
  division: string;
  championship: boolean;
  fighters: Types.ObjectId[];
  rounds: number;
  winner?: Types.ObjectId;
  loser?: Types.ObjectId;
  method?: string;
  round?: number;
  time?: number;
}

export type Fight = IFight & Document;
