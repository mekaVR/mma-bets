import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Fighter } from '@fighters/entities/fighters.entity';
import { FightersService } from '@fighters/services/fighters.service';
import { FightersController } from '@fighters/controllers/fighters.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Fighter])],
  providers: [FightersService],
  exports: [FightersService],
  controllers: [FightersController],
})
export class FightersModule {}
