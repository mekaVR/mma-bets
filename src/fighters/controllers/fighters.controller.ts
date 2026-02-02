import { Controller, Get, Param } from '@nestjs/common';

import { FightersService } from '@fighters/services/fighters.service';
import { Fighter, IFighter } from '@fighters/interfaces/fighter.interface';

@Controller('fighters')
export class FightersController {
  constructor(private fighterService: FightersService) {}

  @Get()
  getAllFighters(): Promise<IFighter[]> {
    return this.fighterService.findAllFighters();
  }

  @Get(':id')
  getFighter(@Param('id') id: string): Promise<Fighter> {
    return this.fighterService.findOne(id);
  }
}
