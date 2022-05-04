import { Test, TestingModule } from '@nestjs/testing';
import { CountryMstResolver } from './country-mst.resolver';

describe('CountryMstResolver', () => {
  let resolver: CountryMstResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CountryMstResolver],
    }).compile();

    resolver = module.get<CountryMstResolver>(CountryMstResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
