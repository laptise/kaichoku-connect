import { Test, TestingModule } from '@nestjs/testing';
import { BankMstService } from './bank-mst.service';

describe('BankMstService', () => {
  let service: BankMstService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BankMstService],
    }).compile();

    service = module.get<BankMstService>(BankMstService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
