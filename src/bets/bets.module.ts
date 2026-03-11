import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Bet } from './entities/bet.entity';
import { BetsServices } from './services/bets.services';
import { BetsController } from './controllers/bets.controller';
import { BetPick } from './entities/bet-pick.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Bet, BetPick])],
  providers: [BetsServices],
  exports: [BetsServices],
  controllers: [BetsController],
})
export class BetsModule {}
