import { Module } from '@nestjs/common';
import { NewMaterialController } from './new-material.controller';
import { NewMaterialService } from './new-material.service';
import { MongooseModule } from '@nestjs/mongoose';
import { MaterialSchema } from '../db-models/material.model';
import { steelSchema } from '../db-models/steel.model';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'material', schema: MaterialSchema },
      { name: 'steel', schema: steelSchema },
    ]),
  ],
  controllers: [NewMaterialController],
  providers: [NewMaterialService],
})
export class NewMaterialModule {}
