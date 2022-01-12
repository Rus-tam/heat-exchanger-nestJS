import { Test, TestingModule } from '@nestjs/testing';
import { MaterialInterpolationService } from './material-interpolation.service';

describe('MaterialInterpolationService', () => {
  let service: MaterialInterpolationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MaterialInterpolationService],
    }).compile();

    service = module.get<MaterialInterpolationService>(MaterialInterpolationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
