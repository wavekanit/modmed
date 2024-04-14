import { Test, TestingModule } from '@nestjs/testing';
import { DocInfoService } from './doc-info.service';

describe('DocInfoService', () => {
  let service: DocInfoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DocInfoService],
    }).compile();

    service = module.get<DocInfoService>(DocInfoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
