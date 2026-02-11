import { Test, TestingModule } from '@nestjs/testing';
import { FightersController } from './fighters.controller';
import { FightersService } from '@fighters/services/fighters.service';

describe('FightersController', () => {
  let controller: FightersController;
  let fightersService: Partial<Record<keyof FightersService, jest.Mock>>;

  const mockFighter = {
    _id: 'fighter-id-123',
    firstName: 'Jon',
    lastName: 'Jones',
    nickName: 'Bones',
    divisions: 'Heavyweight',
  };

  beforeEach(async () => {
    fightersService = {
      findAllFighters: jest.fn(),
      findOne: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [FightersController],
      providers: [{ provide: FightersService, useValue: fightersService }],
    }).compile();

    controller = module.get<FightersController>(FightersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getAllFighters', () => {
    it('should return an array of fighters', async () => {
      fightersService.findAllFighters.mockResolvedValue([mockFighter]);

      const result = await controller.getAllFighters();

      expect(result).toEqual([mockFighter]);
      expect(fightersService.findAllFighters).toHaveBeenCalled();
    });
  });

  describe('getFighter', () => {
    it('should return a single fighter by id', async () => {
      fightersService.findOne.mockResolvedValue(mockFighter);

      const result = await controller.getFighter('fighter-id-123');

      expect(result).toEqual(mockFighter);
      expect(fightersService.findOne).toHaveBeenCalledWith('fighter-id-123');
    });
  });
});
