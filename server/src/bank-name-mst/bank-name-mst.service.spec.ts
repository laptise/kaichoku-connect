import { Test, TestingModule } from '@nestjs/testing';
import { BankNameMstService } from './bank-name-mst.service';

describe('BankNameMstService', () => {
  let service: BankNameMstService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BankNameMstService],
    }).compile();

    service = module.get<BankNameMstService>(BankNameMstService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
