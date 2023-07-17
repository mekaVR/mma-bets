import { Document } from 'mongoose';

export interface IFighter {
  firstName: string;
  lastName: string;
  nickName: string;
  picture: string;
  record: string;
  wins: { koTko: number; submission: number; decisions: number };
  loss: { koTko: number; submission: number; decisions: number };
  draws: number;
  noContests: number;
  height: number;
  weight: number;
  reach: number;
  divisions: string;
  age: number;
  team: string;
  country: string;
  styles: string[];
}
export type Fighter = IFighter & Document;
