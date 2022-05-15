import { Test, TestingModule } from '@nestjs/testing';
import { TradeRequestCatchService } from './trade-request-catch.service';

describe('TradeRequestCatchService', () => {
  let service: TradeRequestCatchService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TradeRequestCatchService],
    }).compile();

    service = module.get<TradeRequestCatchService>(TradeRequestCatchService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
