import { Test, TestingModule } from '@nestjs/testing';
import { UserBankInfoService } from './user-bank-info.service';

describe('UserBankInfoService', () => {
  let service: UserBankInfoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserBankInfoService],
    }).compile();

    service = module.get<UserBankInfoService>(UserBankInfoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
