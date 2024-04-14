import { Test, TestingModule } from '@nestjs/testing';
import { DocInfoController } from './doc-info.controller';
import { DocInfoService } from './doc-info.service';

describe('DocInfoController', () => {
  let controller: DocInfoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DocInfoController],
      providers: [DocInfoService],
    }).compile();

    controller = module.get<DocInfoController>(DocInfoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
