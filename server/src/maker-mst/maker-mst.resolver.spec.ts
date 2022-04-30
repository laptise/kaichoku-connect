import { Test, TestingModule } from '@nestjs/testing';
import { MakerMstResolver } from './maker-mst.resolver';

describe('MakerMstResolver', () => {
  let resolver: MakerMstResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MakerMstResolver],
    }).compile();

    resolver = module.get<MakerMstResolver>(MakerMstResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
