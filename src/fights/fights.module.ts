import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { FightsController } from '@fights/controllers/fights.controller';
import { FightsService } from '@fights/services/fights.service';
import { FightSchema } from '@fights/schemas/fight.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Fight', schema: FightSchema }]),
  ],
  controllers: [FightsController],
  providers: [FightsService],
})
export class FightsModule {}
