import { Test, TestingModule } from '@nestjs/testing';
import { UserBadgeMstService } from './user-badge-mst.service';

describe('UserBadgeMstService', () => {
  let service: UserBadgeMstService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserBadgeMstService],
    }).compile();

    service = module.get<UserBadgeMstService>(UserBadgeMstService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
