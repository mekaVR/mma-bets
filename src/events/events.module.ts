import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { EventsService } from '@events/services/events.service';
import { EventsController } from '@events/controllers/events.controller';
import { EventSchema } from '@events/schemas/event.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Event', schema: EventSchema }]),
  ],
  controllers: [EventsController],
  providers: [EventsService],
})
export class EventsModule {}
