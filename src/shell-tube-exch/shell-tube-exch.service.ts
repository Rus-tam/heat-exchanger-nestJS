import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IMaterial } from '../db-models/material.model';

@Injectable()
export class ShellTubeExchService {
  constructor(@InjectModel('material') private readonly materialModel: Model<IMaterial>) {}

  async fetchMaterial(incomingMaterialData): Promise<IMaterial> {
    const materialDB = await this.materialModel.find({ materialName: incomingMaterialData.materialName });
    return {
      materialName: materialDB[0].materialName,
      properties: materialDB[0].properties,
      Tmelt: materialDB[0].Tmelt,
      Tboil: materialDB[0].Tboil,
    };
  }
}
