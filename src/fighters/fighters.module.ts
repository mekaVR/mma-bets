import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { FightersController } from '@fighters/controllers/fighters.controller';
import { FightersService } from '@fighters/services/fighters.service';
import { FighterSchema } from '@fighters/schemas/fighter.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Fighter', schema: FighterSchema }]),
  ],
  controllers: [FightersController],
  providers: [FightersService],
})
export class FightersModule {}
