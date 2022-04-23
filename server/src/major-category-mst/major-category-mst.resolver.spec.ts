import { Test, TestingModule } from '@nestjs/testing';
import { MajorCategoryMstResolver } from './major-category-mst.resolver';

describe('MajorCategoryMstResolver', () => {
  let resolver: MajorCategoryMstResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MajorCategoryMstResolver],
    }).compile();

    resolver = module.get<MajorCategoryMstResolver>(MajorCategoryMstResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
