import { Test, TestingModule } from '@nestjs/testing';
import { UserBadgeStatusResolver } from './user-badge-status.resolver';

describe('UserBadgeStatusResolver', () => {
  let resolver: UserBadgeStatusResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserBadgeStatusResolver],
    }).compile();

    resolver = module.get<UserBadgeStatusResolver>(UserBadgeStatusResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
