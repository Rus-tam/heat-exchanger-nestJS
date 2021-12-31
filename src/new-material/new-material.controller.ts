import { Body, Controller, Post, Response, Res } from '@nestjs/common';
import { NewMaterialService } from './new-material.service';

@Controller('new-data/')
export class NewMaterialController {
  constructor(private newMaterialService: NewMaterialService) {}

  @Post('new-material')
  async createNewMaterial(@Body('fileName') fileName: string) {
    await this.newMaterialService.addNewMaterial(fileName);
  }

  @Post('new-steel-prop')
  async createSteelProp(@Body('fileName') fileName: string) {
    await this.newMaterialService.addNewSteelData(fileName);
  }
}
