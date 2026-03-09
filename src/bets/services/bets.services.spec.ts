import { BetsServices } from './bets.services';
import { BetStatus } from '../constants/bet.constants';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Bet } from '../entities/bet.entity';
import { BetPick } from '../entities/bet-pick.entity';
import { PG_UNIQUE_VIOLATION } from '../../constants/error-code.constant';
import { ConflictException } from '@nestjs/common';

describe('BetsServices', () => {
  let service: BetsServices;
  let betRepository: any;
  let betPickRepository: any;

  const userId = 1;
  const createBetDto = {
    eventId: 'ufc-300',
    picks: [
      { fightId: 'fight-1', pick: 1 },
      { fightId: 'fight-2', pick: 2 },
    ],
  };

  const mockBet = {
    id: 1,
    eventId: 'ufc-300',
    user: { id: userId },
    totalPoints: 0,
    status: BetStatus.PENDING,
  };

  beforeEach(async () => {
    betRepository = {
      save: jest.fn(),
      find: jest.fn(),
    };

    betPickRepository = {
      save: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BetsServices,
        {
          provide: getRepositoryToken(Bet),
          useValue: betRepository,
        },
        { provide: getRepositoryToken(BetPick), useValue: betPickRepository },
      ],
    }).compile();

    service = module.get<BetsServices>(BetsServices);
  });

  describe('createBet', () => {
    it('should create bet with picks', async () => {
      betRepository.save.mockResolvedValue(mockBet);
      betPickRepository.save.mockResolvedValue([]);

      const result = await service.createBet(createBetDto, userId);

      expect(betRepository.save).toHaveBeenCalledWith({
        eventId: 'ufc-300',
        user: { id: userId },
      });
      expect(betPickRepository.save).toHaveBeenCalledWith([
        { fightId: 'fight-1', pick: 1, bet: mockBet },
        { fightId: 'fight-2', pick: 2, bet: mockBet },
      ]);
      expect(result).toEqual(mockBet);
    });

    it('should throw ConflictException if user already bet on event', async () => {
      betRepository.save.mockRejectedValue({ code: PG_UNIQUE_VIOLATION });

      await expect(service.createBet(createBetDto, userId)).rejects.toThrow(
        ConflictException,
      );
    });
  });

  describe('findByUser', () => {
    it('should return all bets for a user', async () => {
      betRepository.find.mockResolvedValue([mockBet]);

      const result = await service.findByUser(userId);

      expect(betRepository.find).toHaveBeenCalledWith({
        where: { user: { id: userId } },
        relations: ['picks'],
      });
      expect(result).toEqual([mockBet]);
    });
  });
});
