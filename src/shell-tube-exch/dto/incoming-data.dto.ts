import { IsString, IsNumber } from 'class-validator';

export class IncomingDataDto {
  @IsNumber()
  inletTemp: number;
  @IsNumber()
  outletTemp: number;
  @IsNumber()
  massFlowRate: number;
  @IsString()
  materialName: string;
}
