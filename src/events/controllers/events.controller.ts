import { Controller, Get } from '@nestjs/common';

import { EventsService } from '@events/services/events.service';
import { Public } from '@auth/decorators/public.decorator';
import { IEvent } from '@events/interfaces/event.interface';

@Controller('events')
export class EventsController {
  constructor(private eventService: EventsService) {}

  @Public()
  @Get()
  createEvent(): Promise<IEvent[] | []> {
    return this.eventService.findAllEvents();
  }
}
