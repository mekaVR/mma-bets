import { Schema } from 'mongoose';
import { Fight } from '@fights/interfaces/fight.interface';

export const FightSchema = new Schema<Fight>(
  {
    date: { type: Date, required: true },
    event: { type: Schema.Types.ObjectId, ref: 'Event', required: true },
    division: { type: String, required: true },
    championship: { type: Boolean, required: true, default: false },
    fighters: [{ type: Schema.Types.ObjectId, ref: 'Fighter', required: true }],
    rounds: { type: Number, required: true },
    winner: { type: Schema.Types.ObjectId, ref: 'Fighter' },
    loser: { type: Schema.Types.ObjectId, ref: 'Fighter' },
    method: { type: String },
    round: { type: Number },
    time: { type: Number },
  },
  { timestamps: true },
);
