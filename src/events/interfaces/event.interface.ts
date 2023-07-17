import { Document } from 'mongoose';

export interface IEvent {
  name: string;
  shortName?: string;
  season?: string;
  date: Date;
  location: string;
  fights: string[]; // TODO FightID
  league?: string;
  picture: string;
}

export type Event = IEvent & Document;
