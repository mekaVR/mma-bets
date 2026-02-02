import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Fight, IFight } from '@fights/interfaces/fight.interface';

@Injectable()
export class FightsService {
  constructor(@InjectModel('Fight') private fightModel: Model<Fight>) {}

  async findAllFights(): Promise<IFight[]> {
    return this.fightModel.find();
  }
}
