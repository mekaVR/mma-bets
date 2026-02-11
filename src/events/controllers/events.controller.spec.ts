import { Test, TestingModule } from '@nestjs/testing';
import { EventsController } from './events.controller';
import { EventsService } from '@events/services/events.service';

describe('EventsController', () => {
  let controller: EventsController;
  let eventsService: Partial<Record<keyof EventsService, jest.Mock>>;

  const mockEvent = {
    _id: 'event-id-123',
    name: 'UFC 300',
    date: new Date('2024-04-13'),
    location: 'T-Mobile Arena, Las Vegas',
    picture: 'ufc300.jpg',
  };

  beforeEach(async () => {
    eventsService = {
      findAllEvents: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [EventsController],
      providers: [{ provide: EventsService, useValue: eventsService }],
    }).compile();

    controller = module.get<EventsController>(EventsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('createEvent', () => {
    it('should return an array of events', async () => {
      eventsService.findAllEvents.mockResolvedValue([mockEvent]);

      const result = await controller.createEvent();

      expect(result).toEqual([mockEvent]);
      expect(eventsService.findAllEvents).toHaveBeenCalled();
    });

    it('should return an empty array when no events exist', async () => {
      eventsService.findAllEvents.mockResolvedValue([]);

      const result = await controller.createEvent();

      expect(result).toEqual([]);
    });
  });
});
