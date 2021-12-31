import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { IMaterial, IProperty } from '../db-models/material.model';
import * as reader from 'xlsx';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ISteel } from '../db-models/steel.model';

@Injectable()
export class NewMaterialService {
  // Возможно будет лучше этот фурнкционал перенести на фронт и отправлять на фронт только JSON с данными о компоненте
  constructor(@InjectModel('material') private readonly materialModel: Model<IMaterial>, @InjectModel('steel') private readonly steelModel: Model<ISteel>) {}

  private async readFile(fileName) {
    // Файл эксель должен всегда называться - 1.xlsx. Пример оформления файла см в корневой папке.
    // Один файл на один компонент
    const file = await reader.readFile(fileName);
    let data = [];
    const sheets: string[] = file.SheetNames;
    for (let i = 0; i < sheets.length; i++) {
      const temp = reader.utils.sheet_to_json(file.Sheets[file.SheetNames[i]]);
      temp.forEach(res => data.push(res));
    }
    return { data, sheets };
  }

  async steelProp(fileName): Promise<ISteel> {
    const { data, sheets } = await this.readFile(fileName);

    return {
      steelMark: sheets[0],
      properties: data,
    };
  }

  private async materialProp(fileName): Promise<IMaterial> {
    let Tmelt = 0;
    let Tboil = 0;
    let propData = [];
    const { data, sheets } = await this.readFile(fileName);

    data.forEach(part => {
      let obj = {} as IProperty;
      if (part.Tmelt && part.Tboil) {
        Tmelt = part.Tmelt;
        Tboil = part.Tboil;
      }
      obj.temperature = part.temperature;
      obj.kinematicViscosity = part.kinematicViscosity;
      obj.thermalConductivity = part.thermalConductivity;
      obj.heatCapacity = part.heatCapacity;
      obj.dynamicViscosity = part.dynamicViscosity;
      obj.massDensity = part.massDensity;
      obj.Pr = part.Pr;
      propData.push(obj);
    });
    return {
      materialName: sheets[0],
      properties: propData,
      Tmelt: Tmelt,
      Tboil: Tboil,
    };
  }

  async addNewMaterial(fileName): Promise<string> {
    const material: IMaterial = await this.materialProp(fileName);
    console.log(material);
    const existingMaterial = await this.materialModel.find({ materialName: material.materialName });
    if (existingMaterial.length !== 0) {
      throw new HttpException('This material is currently exist in database', HttpStatus.FORBIDDEN);
    }
    try {
      const newMaterial = new this.materialModel({
        materialName: material.materialName,
        properties: material.properties,
        Tmelt: material.Tmelt,
        Tboil: material.Tboil,
      });
      await newMaterial.save();
      return 'Новый компонент успешно размещен в базе данных';
    } catch (e) {
      throw new HttpException('Не удалось сохранить компонент в базе данных', HttpStatus.FORBIDDEN);
    }
  }

  async addNewSteelData(fileName) {
    const steel: ISteel = await this.steelProp(fileName);
    const existingSteel = await this.steelModel.find({ steelMark: steel.steelMark });
    if (existingSteel.length !== 0) {
      throw new HttpException('This steel mark is currently exist in datebase', HttpStatus.FORBIDDEN);
    }
    try {
      const newSteel = new this.steelModel({
        steelMark: steel.steelMark,
        properties: steel.properties,
      });
      await newSteel.save();
    } catch (e) {
      throw new HttpException('Error', HttpStatus.FORBIDDEN);
    }
  }
}
