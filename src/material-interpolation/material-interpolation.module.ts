import { Module } from '@nestjs/common';
import { MaterialInterpolationService } from './material-interpolation.service';

@Module({
  providers: [MaterialInterpolationService],
  exports: [MaterialInterpolationService],
})
export class MaterialInterpolationModule {}
