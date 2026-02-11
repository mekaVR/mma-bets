import { Test, TestingModule } from '@nestjs/testing';
import { FightsController } from './fights.controller';
import { FightsService } from '@fights/services/fights.service';

describe('FightsController', () => {
  let controller: FightsController;
  let fightsService: Partial<Record<keyof FightsService, jest.Mock>>;

  const mockFight = {
    _id: 'fight-id-123',
    date: new Date('2024-03-09'),
    division: 'Heavyweight',
    championship: true,
    rounds: 5,
  };

  beforeEach(async () => {
    fightsService = {
      findAllFights: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [FightsController],
      providers: [{ provide: FightsService, useValue: fightsService }],
    }).compile();

    controller = module.get<FightsController>(FightsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getAllFights', () => {
    it('should return an array of fights', async () => {
      fightsService.findAllFights.mockResolvedValue([mockFight]);

      const result = await controller.getAllFights();

      expect(result).toEqual([mockFight]);
      expect(fightsService.findAllFights).toHaveBeenCalled();
    });

    it('should return an empty array when no fights exist', async () => {
      fightsService.findAllFights.mockResolvedValue([]);

      const result = await controller.getAllFights();

      expect(result).toEqual([]);
    });
  });
});
