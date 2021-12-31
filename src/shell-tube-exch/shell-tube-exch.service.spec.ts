import { Test, TestingModule } from '@nestjs/testing';
import { ShellTubeExchService } from './shell-tube-exch.service';

describe('ShellTubeExchService', () => {
  let service: ShellTubeExchService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ShellTubeExchService],
    }).compile();

    service = module.get<ShellTubeExchService>(ShellTubeExchService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
