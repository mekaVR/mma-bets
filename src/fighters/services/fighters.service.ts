import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Fighter } from '@fighters/entities/fighters.entity';
import { Repository } from 'typeorm';

@Injectable()
export class FightersService {
  constructor(
    @InjectRepository(Fighter) private fighterRepository: Repository<Fighter>,
  ) {}

  async findAll(): Promise<Fighter[]> {
    return await this.fighterRepository.find();
  }

  async findOne(fighterId: number): Promise<Fighter> {
    return await this.fighterRepository.findOneBy({ id: fighterId });
  }
}
