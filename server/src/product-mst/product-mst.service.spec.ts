import { Test, TestingModule } from '@nestjs/testing';
import { ProductMstService } from './product-mst.service';

describe('ProductMstService', () => {
  let service: ProductMstService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProductMstService],
    }).compile();

    service = module.get<ProductMstService>(ProductMstService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
