import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Fighter, IFighter } from '@fighters/interfaces/fighter.interface';

@Injectable()
export class FightersService {
  constructor(@InjectModel('Fighter') private fighterModel: Model<Fighter>) {}

  async findAllFighters(): Promise<IFighter[]> {
    return this.fighterModel.find();
  }

  async findOne(id: string): Promise<Fighter> {
    const fighter = await this.fighterModel.findById(id);
    if (!fighter) {
      throw new NotFoundException(`Fighter avec l'ID ${id} non trouvé`);
    }
    return fighter;
  }
}
