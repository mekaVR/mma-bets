import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Fighter, IFighter } from '@fighters/interfaces/fighter.interface';

@Injectable()
export class FightersService {
  constructor(@InjectModel('Fighter') private fighterModel: Model<Fighter>) {}

  async findAllFighters(): Promise<IFighter[]> {
    return this.fighterModel.find();
  }
}
