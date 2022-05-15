import { Test, TestingModule } from '@nestjs/testing';
import { TradeRequestCatchResolver } from './trade-request-catch.resolver';

describe('TradeRequestCatchResolver', () => {
  let resolver: TradeRequestCatchResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TradeRequestCatchResolver],
    }).compile();

    resolver = module.get<TradeRequestCatchResolver>(TradeRequestCatchResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
