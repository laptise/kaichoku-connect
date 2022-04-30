import { Test, TestingModule } from '@nestjs/testing';
import { MakerMstService } from './maker-mst.service';

describe('MakerMstService', () => {
  let service: MakerMstService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MakerMstService],
    }).compile();

    service = module.get<MakerMstService>(MakerMstService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
