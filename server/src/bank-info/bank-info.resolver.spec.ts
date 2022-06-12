import { Test, TestingModule } from '@nestjs/testing';
import { BankInfoResolver } from './bank-info.resolver';

describe('BankInfoResolver', () => {
  let resolver: BankInfoResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BankInfoResolver],
    }).compile();

    resolver = module.get<BankInfoResolver>(BankInfoResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
