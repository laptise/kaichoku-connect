import { Test, TestingModule } from '@nestjs/testing';
import { UserBadgeMstResolver } from './user-badge-mst.resolver';

describe('UserBadgeMstResolver', () => {
  let resolver: UserBadgeMstResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserBadgeMstResolver],
    }).compile();

    resolver = module.get<UserBadgeMstResolver>(UserBadgeMstResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
