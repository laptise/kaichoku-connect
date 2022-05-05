import { Test, TestingModule } from '@nestjs/testing';
import { TradeRequestCommentService } from './trade-request-comment.service';

describe('TradeRequestCommentService', () => {
  let service: TradeRequestCommentService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TradeRequestCommentService],
    }).compile();

    service = module.get<TradeRequestCommentService>(TradeRequestCommentService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
