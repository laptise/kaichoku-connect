import { Test, TestingModule } from '@nestjs/testing';
import { UserAddressInfoResolver } from './user-address-info.resolver';

describe('UserAddressInfoResolver', () => {
  let resolver: UserAddressInfoResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserAddressInfoResolver],
    }).compile();

    resolver = module.get<UserAddressInfoResolver>(UserAddressInfoResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
