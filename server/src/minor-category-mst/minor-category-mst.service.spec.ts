import { Test, TestingModule } from '@nestjs/testing';
import { MinorCategoryMstService } from './minor-category-mst.service';

describe('MinorCategoryMstService', () => {
  let service: MinorCategoryMstService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MinorCategoryMstService],
    }).compile();

    service = module.get<MinorCategoryMstService>(MinorCategoryMstService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
