import { Test, TestingModule } from '@nestjs/testing';
import { ShellTubeExchController } from './shell-tube-exch.controller';

describe('ShellTubeExchController', () => {
  let controller: ShellTubeExchController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ShellTubeExchController],
    }).compile();

    controller = module.get<ShellTubeExchController>(ShellTubeExchController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
