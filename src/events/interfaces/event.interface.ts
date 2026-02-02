import { Document, Types } from 'mongoose';

export interface IEvent {
  name: string;
  shortName?: string;
  season?: string;
  date: Date;
  location: string;
  fights: Types.ObjectId[];
  league?: string;
  picture: string;
}

export type Event = IEvent & Document;
