import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Fighter } from '@fighters/interfaces/fighter.interface';

@Injectable()
export class FightersService {
  constructor(@InjectModel('Fighter') private fighterModel: Model<Fighter>) {}

  async findAllFighters(): Promise<Fighter[]> {
    try {
      return await this.fighterModel.find();
    } catch (e) {}
  }
}
