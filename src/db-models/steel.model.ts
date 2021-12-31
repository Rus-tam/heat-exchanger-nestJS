import * as mongoose from 'mongoose';

export const steelSchema = new mongoose.Schema({
  steelMark: {
    type: String,
  },

  properties: [
    {
      temperature: {
        type: Number,
        required: true,
      },
      thermalConductivity: {
        type: Number,
        required: true,
      },
    },
  ],
});

export interface ISteelProp {
  temperature: number;
  thermalConductivity: number;
}

export interface ISteel {
  steelMark: string;
  properties: ISteelProp[];
}
