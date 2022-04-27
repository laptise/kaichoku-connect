import { Test, TestingModule } from '@nestjs/testing';
import { TradeRequestImageResolver } from './trade-request-image.resolver';

describe('TradeRequestImageResolver', () => {
  let resolver: TradeRequestImageResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TradeRequestImageResolver],
    }).compile();

    resolver = module.get<TradeRequestImageResolver>(TradeRequestImageResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
