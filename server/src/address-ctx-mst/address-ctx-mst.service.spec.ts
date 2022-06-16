import { Test, TestingModule } from '@nestjs/testing';
import { AddressCtxMstService } from './address-ctx-mst.service';

describe('AddressCtxMstService', () => {
  let service: AddressCtxMstService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AddressCtxMstService],
    }).compile();

    service = module.get<AddressCtxMstService>(AddressCtxMstService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
