import { BetsController } from './bets.controller';
import { BetsServices } from '../services/bets.services';
import { Test, TestingModule } from '@nestjs/testing';
import { BetStatus } from '../constants/bet.constants';

describe('BetsController', () => {
  let controller: BetsController;
  let betsService: Partial<Record<keyof BetsServices, jest.Mock>>;

  const userId = 1;
  const mockRequest = {
    user: { id: userId, username: 'testuser' },
  };

  const mockBet = {
    id: 1,
    eventId: 'ufc-300',
    user: { id: userId },
    totalPoints: 0,
    status: BetStatus.PENDING,
  };

  const createBetDto = {
    eventId: 'ufc-300',
    picks: [
      { fightId: 'fight-1', pick: 1 },
      { fightId: 'fight-2', pick: 2 },
    ],
  };

  beforeEach(async () => {
    betsService = {
      createBet: jest.fn(),
      findByUser: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [BetsController],
      providers: [{ provide: BetsServices, useValue: betsService }],
    }).compile();

    controller = module.get<BetsController>(BetsController);
  });

  describe('createBet', () => {
    it('should create a bet', async () => {
      betsService.createBet.mockResolvedValue(mockBet);

      const result = await controller.createBet(
        mockRequest as any,
        createBetDto,
      );

      expect(betsService.createBet).toHaveBeenCalledWith(createBetDto, userId);
      expect(result).toEqual(mockBet);
    });
  });

  describe('getMyBets', () => {
    it('should return a bets', async () => {
      betsService.findByUser.mockResolvedValue([mockBet]);

      const result = await controller.getMyBets(mockRequest as any);

      expect(betsService.findByUser).toHaveBeenCalledWith(userId);
      expect(result).toEqual([mockBet]);
    });
  });
});
