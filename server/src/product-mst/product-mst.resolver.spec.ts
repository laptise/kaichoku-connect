import { Test, TestingModule } from '@nestjs/testing';
import { ProductMstResolver } from './product-mst.resolver';

describe('ProductMstResolver', () => {
  let resolver: ProductMstResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProductMstResolver],
    }).compile();

    resolver = module.get<ProductMstResolver>(ProductMstResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
