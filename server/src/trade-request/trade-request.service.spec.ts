import { Test, TestingModule } from '@nestjs/testing';
import { TradeRequestService } from './trade-request.service';

describe('TradeRequestService', () => {
  let service: TradeRequestService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TradeRequestService],
    }).compile();

    service = module.get<TradeRequestService>(TradeRequestService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
