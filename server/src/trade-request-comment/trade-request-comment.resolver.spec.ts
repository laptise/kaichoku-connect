import { Test, TestingModule } from '@nestjs/testing';
import { TradeRequestCommentResolver } from './trade-request-comment.resolver';

describe('TradeRequestCommentResolver', () => {
  let resolver: TradeRequestCommentResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TradeRequestCommentResolver],
    }).compile();

    resolver = module.get<TradeRequestCommentResolver>(TradeRequestCommentResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
