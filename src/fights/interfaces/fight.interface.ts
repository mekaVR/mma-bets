import { Document } from 'mongoose';

export interface IFight {
  date: Date;
  event: string; // TODO EVENT OBJECT
  division: string;
  championship: boolean;
  fighters: string[]; // TODO FighterID
  rounds: number;
  winner?: string; // TODO FighterID
  loser?: string; // TODO FighterID
  method?: string;
  round?: number;
  time?: number;
}

export type Fight = IFight & Document;
