import { Test, TestingModule } from '@nestjs/testing';
import { UserBadgeStatusService } from './user-badge-status.service';

describe('UserBadgeStatusService', () => {
  let service: UserBadgeStatusService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserBadgeStatusService],
    }).compile();

    service = module.get<UserBadgeStatusService>(UserBadgeStatusService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
