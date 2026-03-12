import { FightersController } from '@fighters/controllers/fighters.controller';
import { FightersService } from '@fighters/services/fighters.service';
import { Test, TestingModule } from '@nestjs/testing';
import {
  mockFighter,
  mockFightersList,
} from '@fighters/__mocks__/fighters.mocks';

describe('FightersController', () => {
  let controller: FightersController;
  let fightersService: Partial<Record<keyof FightersService, jest.Mock>>;

  beforeEach(async () => {
    fightersService = {
      findAll: jest.fn(),
      findOne: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [FightersController],
      providers: [{ provide: FightersService, useValue: fightersService }],
    }).compile();

    controller = module.get<FightersController>(FightersController);
  });

  describe('getAll', () => {
    it('should return an array of fighters', async () => {
      fightersService.findAll.mockResolvedValue(mockFightersList);

      const result = await controller.getAll();

      expect(result).toEqual(mockFightersList);
      expect(fightersService.findAll).toHaveBeenCalled();
    });
  });

  describe('getOne', () => {
    it('should return a single fighter by id', async () => {
      fightersService.findOne.mockResolvedValue(mockFighter);

      const result = await controller.getFighter(mockFighter.id);

      expect(result).toEqual(mockFighter);
      expect(fightersService.findOne).toHaveBeenCalledWith(mockFighter.id);
    });
  });
});
