import { Injectable } from '@nestjs/common';
import { IMaterial, IProperty } from '../db-models/material.model';
import { IncomingDataDto } from '../shell-tube-exch/dto/incoming-data.dto';

@Injectable()
export class MaterialInterpolationService {
  private endPoints(temperature: number): { biggerEndPoint: number; lessEndPoint: number } {
    const temp = Math.round(temperature);

    let biggerEndPoint = temp;
    let lessEndPoint = temp;

    if (temp > 100) {
      while (biggerEndPoint % 20 !== 0) {
        biggerEndPoint++;
      }
      while (lessEndPoint % 20 !== 0) {
        lessEndPoint--;
      }
    } else if (temp < 100) {
      while (biggerEndPoint % 10) {
        biggerEndPoint++;
      }
      while (lessEndPoint % 10) {
        lessEndPoint--;
      }
    }
    return { biggerEndPoint, lessEndPoint };
  }

  interpolation(material: IMaterial, incomingMaterialData: IncomingDataDto) {
    const temperature = incomingMaterialData.inletTemp;
    const { biggerEndPoint, lessEndPoint } = this.endPoints(temperature);
    let biggerEndPointMaterial: IProperty = material.properties.find(prop => prop.temperature === biggerEndPoint);
    let lessEndPointMaterial: IProperty = material.properties.find(prop => prop.temperature === lessEndPoint);
    if (biggerEndPointMaterial !== lessEndPointMaterial) {
      let interpolatedMaterial = {};
      interpolatedMaterial['temperature'] = incomingMaterialData.inletTemp;
      interpolatedMaterial['materialName'] = incomingMaterialData.materialName;
      Object.keys(biggerEndPointMaterial.toJSON()).forEach(key => {
        interpolatedMaterial[key] =
          lessEndPointMaterial[key] +
          ((biggerEndPointMaterial[key] - lessEndPointMaterial[key]) / (biggerEndPoint - lessEndPoint)) * (temperature - lessEndPoint);
      });
      return interpolatedMaterial;
    } else {
      return {
        materialName: incomingMaterialData.materialName,
        temperature: incomingMaterialData.inletTemp,
        massDensity: lessEndPointMaterial.massDensity,
        dynamicViscosity: lessEndPointMaterial.dynamicViscosity,
        kinematicViscosity: lessEndPointMaterial.kinematicViscosity,
        thermalConductivity: lessEndPointMaterial.thermalConductivity,
        heatCapacity: lessEndPointMaterial.heatCapacity,
        Pr: lessEndPointMaterial.Pr,
      };
    }
  }
}
