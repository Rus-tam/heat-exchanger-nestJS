import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ShellTubeExchService } from './shell-tube-exch.service';

import { MaterialInterpolationService } from './materialInterpolationService';
import { IncomingDataDto } from './dto/incoming-data.dto';

@Controller('heat-exch/shell-tube-exch')
export class ShellTubeExchController {
  constructor(private service: ShellTubeExchService, private materialInterpolationService: MaterialInterpolationService) {}

  @Post()
  async exchangerCalc(@Body() incomingMaterialData: IncomingDataDto) {
    const material = await this.service.fetchMaterial(incomingMaterialData);
    const interpolatedMaterial = this.materialInterpolationService.interpolation(material, incomingMaterialData);
    return interpolatedMaterial;
  }
}
