import { Controller, Get } from '@nestjs/common';

import { FightsService } from '@fights/services/fights.service';
import { IFight } from '@fights/interfaces/fight.interface';

@Controller('fights')
export class FightsController {
  constructor(private fightService: FightsService) {}

  @Get()
  getAllFights(): Promise<IFight[] | []> {
    return this.fightService.findAllFights();
  }
}
