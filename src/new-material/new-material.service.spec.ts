import { Test, TestingModule } from '@nestjs/testing';
import { NewMaterialService } from './new-material.service';

describe('NewMaterialService', () => {
  let service: NewMaterialService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [NewMaterialService],
    }).compile();

    service = module.get<NewMaterialService>(NewMaterialService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
