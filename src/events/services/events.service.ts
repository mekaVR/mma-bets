import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Event, IEvent } from '@events/interfaces/event.interface';

@Injectable()
export class EventsService {
  constructor(@InjectModel('Event') private eventModel: Model<Event>) {}

  async findAllEvents(): Promise<IEvent[] | []> {
    try {
      return await this.eventModel.find();
    } catch (e) {
      console.log('ERROR:[FIND_ALL_EVENTS]', e);
    }
  }
}
