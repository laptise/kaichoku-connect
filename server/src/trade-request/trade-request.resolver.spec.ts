import { Test, TestingModule } from '@nestjs/testing';
import { TradeRequestResolver } from './trade-request.resolver';

describe('TradeRequestResolver', () => {
  let resolver: TradeRequestResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TradeRequestResolver],
    }).compile();

    resolver = module.get<TradeRequestResolver>(TradeRequestResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
