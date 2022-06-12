import { Test, TestingModule } from '@nestjs/testing';
import { BankNameMstResolver } from './bank-name-mst.resolver';

describe('BankNameMstResolver', () => {
  let resolver: BankNameMstResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BankNameMstResolver],
    }).compile();

    resolver = module.get<BankNameMstResolver>(BankNameMstResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
