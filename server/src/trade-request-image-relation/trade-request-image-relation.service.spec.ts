import { Test, TestingModule } from '@nestjs/testing';
import { TradeRequestImageRelationService } from './trade-request-image-relation.service';

describe('TradeRequestImageRelationService', () => {
  let service: TradeRequestImageRelationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TradeRequestImageRelationService],
    }).compile();

    service = module.get<TradeRequestImageRelationService>(
      TradeRequestImageRelationService,
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
