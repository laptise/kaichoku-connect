import { Test, TestingModule } from '@nestjs/testing';
import { MinorCategoryMstResolver } from './minor-category-mst.resolver';

describe('MinorCategoryMstResolver', () => {
  let resolver: MinorCategoryMstResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MinorCategoryMstResolver],
    }).compile();

    resolver = module.get<MinorCategoryMstResolver>(MinorCategoryMstResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
