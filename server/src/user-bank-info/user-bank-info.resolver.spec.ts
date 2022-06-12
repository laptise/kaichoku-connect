import { Test, TestingModule } from '@nestjs/testing';
import { UserBankInfoResolver } from './user-bank-info.resolver';

describe('UserBankInfoResolver', () => {
  let resolver: UserBankInfoResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserBankInfoResolver],
    }).compile();

    resolver = module.get<UserBankInfoResolver>(UserBankInfoResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
