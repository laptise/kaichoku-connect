import { Test, TestingModule } from '@nestjs/testing';
import { CountryMstService } from './country-mst.service';

describe('CountryMstService', () => {
  let service: CountryMstService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CountryMstService],
    }).compile();

    service = module.get<CountryMstService>(CountryMstService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
