import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ShellTubeExchController } from './shell-tube-exch.controller';
import { ShellTubeExchService } from './shell-tube-exch.service';
import { MaterialSchema } from '../db-models/material.model';
import { MaterialInterpolationService } from './materialInterpolationService';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'material', schema: MaterialSchema }])],
  controllers: [ShellTubeExchController],
  providers: [ShellTubeExchService, MaterialInterpolationService],
})
export class ShellTubeExchModule {}
