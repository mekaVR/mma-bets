import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { FightersService } from '@fighters/services/fighters.service';
import { Fighter } from '@fighters/entities/fighters.entity';

@Controller('fighters')
export class FightersController {
  constructor(private fighterService: FightersService) {}

  @Get()
  getAll(): Promise<Fighter[]> {
    return this.fighterService.findAll();
  }

  @Get(':id')
  getFighter(@Param('id', ParseIntPipe) id: number): Promise<Fighter> {
    return this.fighterService.findOne(id);
  }
}
