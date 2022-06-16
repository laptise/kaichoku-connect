import { Test, TestingModule } from '@nestjs/testing';
import { AddressCtxMstResolver } from './address-ctx-mst.resolver';

describe('AddressCtxMstResolver', () => {
  let resolver: AddressCtxMstResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AddressCtxMstResolver],
    }).compile();

    resolver = module.get<AddressCtxMstResolver>(AddressCtxMstResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
