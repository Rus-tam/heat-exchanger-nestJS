import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ShellTubeExchController } from './shell-tube-exch.controller';
import { ShellTubeExchService } from './shell-tube-exch.service';
import { MaterialSchema } from '../db-models/material.model';
import { MaterialInterpolationService } from '../material-interpolation/material-interpolation.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'material', schema: MaterialSchema }]), MaterialInterpolationService],
  controllers: [ShellTubeExchController],
  providers: [ShellTubeExchService, MaterialInterpolationService],
})
export class ShellTubeExchModule {}
