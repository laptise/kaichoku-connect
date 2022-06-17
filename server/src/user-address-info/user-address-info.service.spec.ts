import { Test, TestingModule } from '@nestjs/testing';
import { UserAddressInfoService } from './user-address-info.service';

describe('UserAddressInfoService', () => {
  let service: UserAddressInfoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserAddressInfoService],
    }).compile();

    service = module.get<UserAddressInfoService>(UserAddressInfoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
