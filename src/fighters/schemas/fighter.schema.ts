import { Schema } from 'mongoose';
import { Fighter } from '@fighters/interfaces/fighter.interface';

export const FighterSchema = new Schema<Fighter>(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    nickName: { type: String },
    picture: { type: String },
    record: { type: String },
    wins: {
      koTko: { type: Number, required: true, default: 0 },
      submission: { type: Number, required: true, default: 0 },
      decisions: { type: Number, required: true, default: 0 },
    },
    loss: {
      koTko: { type: Number, required: true, default: 0 },
      submission: { type: Number, required: true, default: 0 },
      decisions: { type: Number, required: true, default: 0 },
    },
    draws: { type: Number, default: 0 },
    noContests: { type: Number, default: 0 },
    height: { type: Number, required: true },
    weight: { type: Number, required: true },
    reach: { type: Number, required: true },
    divisions: { type: String, required: true },
    age: { type: Number, required: true },
    team: { type: String },
    country: { type: String },
    styles: [{ type: String }],
  },
  { timestamps: true },
);
