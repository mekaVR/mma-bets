import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { FightsService } from './fights.service';

describe('FightsService', () => {
  let service: FightsService;
  let fightModel: Record<string, jest.Mock>;

  const mockFight = {
    _id: 'fight-id-123',
    date: new Date('2024-03-09'),
    event: 'event-id-123',
    division: 'Heavyweight',
    championship: true,
    fighters: ['fighter-id-1', 'fighter-id-2'],
    rounds: 5,
    winner: 'fighter-id-1',
    method: 'KO/TKO',
    round: 3,
    time: 245,
  };

  beforeEach(async () => {
    fightModel = {
      find: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FightsService,
        { provide: getModelToken('Fight'), useValue: fightModel },
      ],
    }).compile();

    service = module.get<FightsService>(FightsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAllFights', () => {
    it('should return an array of fights', async () => {
      fightModel.find.mockResolvedValue([mockFight]);

      const result = await service.findAllFights();

      expect(result).toEqual([mockFight]);
      expect(fightModel.find).toHaveBeenCalled();
    });

    it('should return an empty array when no fights exist', async () => {
      fightModel.find.mockResolvedValue([]);

      const result = await service.findAllFights();

      expect(result).toEqual([]);
    });
  });
});
