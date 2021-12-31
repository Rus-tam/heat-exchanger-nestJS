import { Test, TestingModule } from '@nestjs/testing';
import { NewMaterialController } from './new-material.controller';

describe('NewMaterialController', () => {
  let controller: NewMaterialController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [NewMaterialController],
    }).compile();

    controller = module.get<NewMaterialController>(NewMaterialController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
