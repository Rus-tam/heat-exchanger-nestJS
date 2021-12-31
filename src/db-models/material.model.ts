import * as mongoose from 'mongoose';
import { ObjectId } from 'mongoose';

export const MaterialSchema = new mongoose.Schema({
  materialName: {
    type: String,
    required: true,
  },

  properties: [
    {
      temperature: {
        type: Number,
        required: true,
      },
      kinematicViscosity: {
        type: Number,
        required: true,
      },
      thermalConductivity: {
        type: Number,
        required: true,
      },
      heatCapacity: {
        type: Number,
        required: true,
      },
      dynamicViscosity: {
        type: Number,
        required: true,
      },
      massDensity: {
        type: Number,
        required: true,
      },
      Pr: {
        type: Number,
        required: true,
      },
    },
  ],
  Tmelt: {
    type: Number,
    required: true,
  },
  Tboil: {
    type: Number,
    required: true,
  },
});

export interface IProperty {
  temperature: number;
  kinematicViscosity: number;
  thermalConductivity: number;
  heatCapacity: number;
  dynamicViscosity: number;
  massDensity: number;
  Pr: number;
  _id?: ObjectId;
  Tmelt?: number;
  Tboil?: number;
  toJSON(): string[];
}

export interface IMaterial {
  materialName?: string;
  properties?: IProperty[];
  Tmelt?: number;
  Tboil?: number;
  _id?: ObjectId;
}
