import { Body, Controller, Get, Post, Request } from '@nestjs/common';
import { BetsServices } from '../services/bets.services';
import { CreateBetDto } from '../dto/create-bet.dto';
import { AuthenticatedRequest } from '@auth/interfaces/authenticated-request.interface';

@Controller('bets')
export class BetsController {
  constructor(private betServices: BetsServices) {}

  @Post()
  createBet(
    @Request() req: AuthenticatedRequest,
    @Body() createBetDto: CreateBetDto,
  ) {
    return this.betServices.createBet(createBetDto, req.user.id);
  }

  @Get()
  getMyBets(@Request() req: AuthenticatedRequest) {
    return this.betServices.findByUser(req.user.id);
  }
}
