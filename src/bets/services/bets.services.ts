import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Bet } from '../entities/bet.entity';
import { Repository } from 'typeorm';
import { BetPick } from '../entities/bet-pick.entity';
import { CreateBetDto } from '../dto/create-bet.dto';
import { PG_UNIQUE_VIOLATION } from '../../constants/error-code.constant';

@Injectable()
export class BetsServices {
  constructor(
    @InjectRepository(Bet) private betRepository: Repository<Bet>,
    @InjectRepository(BetPick)
    private betPickRepository: Repository<BetPick>,
  ) {}

  async createBet(createBetDto: CreateBetDto, userId: number): Promise<Bet> {
    try {
      const bet = await this.betRepository.save({
        eventId: createBetDto.eventId,
        user: { id: userId },
      });

      const betPicks = createBetDto.picks.map((pick) => ({
        ...pick,
        bet: bet,
      }));
      await this.betPickRepository.save(betPicks);

      return bet;
    } catch (error) {
      if (error.code === PG_UNIQUE_VIOLATION) {
        throw new ConflictException('Vous avez déjà parié sur cet event');
      }
      throw error;
    }
  }

  async findByUser(userId: number): Promise<Bet[]> {
    return this.betRepository.find({
      where: { user: { id: userId } },
      relations: ['picks'],
    });
  }
}
