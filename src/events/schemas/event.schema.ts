import { Schema } from 'mongoose';
import { Event } from '@events/interfaces/event.interface';

export const EventSchema = new Schema<Event>(
  {
    name: { type: String, required: true },
    shortName: { type: String },
    season: { type: String },
    date: { type: Date, required: true },
    location: { type: String, required: true },
    fights: [{ type: Schema.Types.ObjectId, ref: 'Fight' }],
    league: { type: String },
    picture: { type: String, required: true },
  },
  { timestamps: true },
);
