/* eslint-disable @typescript-eslint/no-unused-vars */
import { Query, Resolver } from '@nestjs/graphql';
import { MakerMst } from './maker-mst';
import { MakerMstService } from './maker-mst.service';

@Resolver((of) => MakerMst)
export class MakerMstResolver {
  constructor(private makerMstService: MakerMstService) {}
  @Query((returns) => [MakerMst])
  async getAllMakers() {
    return await this.makerMstService.findAll();
  }
}
