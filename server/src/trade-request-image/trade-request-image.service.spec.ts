import { Test, TestingModule } from '@nestjs/testing';
import { TradeRequestImageService } from './trade-request-image.service';

describe('TradeRequestImageService', () => {
  let service: TradeRequestImageService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TradeRequestImageService],
    }).compile();

    service = module.get<TradeRequestImageService>(TradeRequestImageService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
