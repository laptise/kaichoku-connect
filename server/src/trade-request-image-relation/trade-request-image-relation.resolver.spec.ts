import { Test, TestingModule } from '@nestjs/testing';
import { TradeRequestImageRelationResolver } from './trade-request-image-relation.resolver';

describe('TradeRequestImageRelationResolver', () => {
  let resolver: TradeRequestImageRelationResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TradeRequestImageRelationResolver],
    }).compile();

    resolver = module.get<TradeRequestImageRelationResolver>(TradeRequestImageRelationResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
