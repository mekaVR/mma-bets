import { Schema } from 'mongoose';
import { Fighter } from '@fighters/interfaces/fighter.interface';
import {
  STRING_REQUIRED,
  STRING,
  NUMBER_REQUIRED,
  NUMBER,
} from '@utils/models';

export const FighterSchema = new Schema<Fighter>({
  firstName: { ...STRING_REQUIRED },
  lastName: { ...STRING_REQUIRED },
  nickName: { ...STRING },
  picture: { ...STRING },
  record: { ...STRING }, // WINS - LOSS - DRAWS? - NO_CONTESTS?
  wins: {
    koTko: { ...NUMBER_REQUIRED },
    submission: { ...NUMBER_REQUIRED },
    decisions: { ...NUMBER_REQUIRED },
  },
  loss: {
    koTko: { ...NUMBER_REQUIRED },
    submission: { ...NUMBER_REQUIRED },
    decisions: { ...NUMBER_REQUIRED },
  },
  draws: { ...NUMBER },
  noContests: { ...NUMBER },
  height: { ...NUMBER_REQUIRED },
  weight: { ...NUMBER_REQUIRED },
  reach: { ...NUMBER_REQUIRED },
  divisions: { ...STRING_REQUIRED },
  age: { ...NUMBER_REQUIRED },
  team: { ...STRING },
  country: { ...STRING },
  styles: [{ ...STRING }],
});
