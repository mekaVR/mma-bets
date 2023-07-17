import { Schema } from 'mongoose';

import { Event } from '@events/interfaces/event.interface';
import { DATE_REQUIRED, STRING, STRING_REQUIRED } from '@utils/models';

export const EventSchema = new Schema<Event>({
  name: { ...STRING_REQUIRED },
  shortName: { ...STRING },
  season: { ...STRING },
  date: { ...DATE_REQUIRED },
  location: { ...STRING_REQUIRED },
  fights: [{ ...STRING_REQUIRED }],
  league: { ...STRING },
  picture: { ...STRING_REQUIRED },
});
