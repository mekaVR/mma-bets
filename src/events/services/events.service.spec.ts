import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { EventsService } from './events.service';

describe('EventsService', () => {
  let service: EventsService;
  let eventModel: Record<string, jest.Mock>;

  const mockEvent = {
    _id: 'event-id-123',
    name: 'UFC 300',
    shortName: 'UFC300',
    season: '2024',
    date: new Date('2024-04-13'),
    location: 'T-Mobile Arena, Las Vegas',
    fights: ['fight-id-1', 'fight-id-2'],
    league: 'UFC',
    picture: 'ufc300.jpg',
  };

  beforeEach(async () => {
    eventModel = {
      find: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        EventsService,
        { provide: getModelToken('Event'), useValue: eventModel },
      ],
    }).compile();

    service = module.get<EventsService>(EventsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAllEvents', () => {
    it('should return an array of events', async () => {
      eventModel.find.mockResolvedValue([mockEvent]);

      const result = await service.findAllEvents();

      expect(result).toEqual([mockEvent]);
      expect(eventModel.find).toHaveBeenCalled();
    });

    it('should return an empty array when no events exist', async () => {
      eventModel.find.mockResolvedValue([]);

      const result = await service.findAllEvents();

      expect(result).toEqual([]);
    });
  });
});