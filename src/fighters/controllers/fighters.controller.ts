import { Get, Param } from '@nestjs/common';
import { Controller } from '@nestjs/common';
import { FightersService } from '@fighters/services/fighters.service';
import { Fighter } from '@fighters/interfaces/fighter.interface';

@Controller('fighters')
export class FightersController {
  constructor(private fighterService: FightersService) {}
  @Get()
  getAllFighters(): Promise<Fighter[] | []> {
    return this.fighterService.findAllFighters();
  }

  @Get(':id')
  getFighter(@Param('id') id: string): any {
    return `Return fighter with this id: ${id}`;
  }
}
