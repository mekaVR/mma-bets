import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException } from '@nestjs/common';
import { getModelToken } from '@nestjs/mongoose';
import { FightersService } from './fighters.service';

describe('FightersService', () => {
  let service: FightersService;
  let fighterModel: Record<string, jest.Mock>;

  const mockFighter = {
    _id: 'fighter-id-123',
    firstName: 'Jon',
    lastName: 'Jones',
    nickName: 'Bones',
    picture: 'jones.jpg',
    record: '27-1-0',
    wins: { koTko: 10, submission: 6, decisions: 11 },
    loss: { koTko: 0, submission: 0, decisions: 1 },
    draws: 0,
    noContests: 1,
    height: 193,
    weight: 93,
    reach: 215,
    divisions: 'Heavyweight',
    age: 36,
    team: 'Jackson Wink MMA',
    country: 'USA',
    styles: ['Wrestling', 'Muay Thai'],
  };

  beforeEach(async () => {
    fighterModel = {
      find: jest.fn(),
      findById: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FightersService,
        { provide: getModelToken('Fighter'), useValue: fighterModel },
      ],
    }).compile();

    service = module.get<FightersService>(FightersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAllFighters', () => {
    it('should return an array of fighters', async () => {
      fighterModel.find.mockResolvedValue([mockFighter]);

      const result = await service.findAllFighters();

      expect(result).toEqual([mockFighter]);
      expect(fighterModel.find).toHaveBeenCalled();
    });

    it('should return an empty array when no fighters exist', async () => {
      fighterModel.find.mockResolvedValue([]);

      const result = await service.findAllFighters();

      expect(result).toEqual([]);
    });
  });

  describe('findOne', () => {
    it('should return a fighter by id', async () => {
      fighterModel.findById.mockResolvedValue(mockFighter);

      const result = await service.findOne('fighter-id-123');

      expect(result).toEqual(mockFighter);
      expect(fighterModel.findById).toHaveBeenCalledWith('fighter-id-123');
    });

    it('should throw NotFoundException if fighter not found', async () => {
      fighterModel.findById.mockResolvedValue(null);

      await expect(service.findOne('unknown-id')).rejects.toThrow(
        NotFoundException,
      );
    });
  });
});
