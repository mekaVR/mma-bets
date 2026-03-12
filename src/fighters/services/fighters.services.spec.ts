import { FightersService } from './fighters.service';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Fighter } from '@fighters/entities/fighters.entity';
import {
  mockFighter,
  mockFightersList,
} from '@fighters/__mocks__/fighters.mocks';
import { Repository } from 'typeorm';

describe('FightersService', () => {
  let service: FightersService;
  let fighterRepository: Partial<Record<keyof Repository<Fighter>, jest.Mock>>;

  beforeEach(async () => {
    fighterRepository = {
      find: jest.fn(),
      findOneBy: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FightersService,
        { provide: getRepositoryToken(Fighter), useValue: fighterRepository },
      ],
    }).compile();

    service = module.get<FightersService>(FightersService);
  });

  describe('getAll', () => {
    it('should return a list of FighterEntity', async () => {
      fighterRepository.find.mockResolvedValue(mockFightersList);

      const result = await service.findAll();

      expect(result).toEqual(mockFightersList);
      expect(fighterRepository.find).toHaveBeenCalled();
    });
  });

  describe('getOne', () => {
    it('should return a single fighterEntity by id', async () => {
      fighterRepository.findOneBy.mockResolvedValue(mockFighter);

      const result = await service.findOne(mockFighter.id);

      expect(result).toEqual(mockFighter);
      expect(fighterRepository.findOneBy).toHaveBeenCalledWith({
        id: mockFighter.id,
      });
    });
  });
});
