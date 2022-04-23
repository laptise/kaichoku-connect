import { Test, TestingModule } from '@nestjs/testing';
import { MajorCategoryMstService } from './major-category-mst.service';

describe('MajorCategoryMstService', () => {
  let service: MajorCategoryMstService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MajorCategoryMstService],
    }).compile();

    service = module.get<MajorCategoryMstService>(MajorCategoryMstService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
