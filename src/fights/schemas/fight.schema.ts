import { Schema } from 'mongoose';
import { Fight } from '@fights/interfaces/fight.interface';
import {
  BOOLEAN_REQUIRED,
  DATE_REQUIRED,
  NUMBER,
  NUMBER_REQUIRED,
  STRING,
  STRING_REQUIRED,
} from '@utils/models';

export const FightSchema = new Schema<Fight>({
  date: { ...DATE_REQUIRED },
  event: { ...STRING_REQUIRED }, // TODO EVENT ID
  division: { ...STRING_REQUIRED },
  championship: { ...BOOLEAN_REQUIRED },
  fighters: [{ ...STRING_REQUIRED }], // TODO FighterID
  rounds: { ...NUMBER_REQUIRED },
  winner: { ...STRING }, // TODO FighterID
  loser: { ...STRING }, // TODO FighterID
  method: { ...STRING },
  round: { ...NUMBER },
  time: { ...NUMBER },
});
