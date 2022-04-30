/* eslint-disable @typescript-eslint/no-unused-vars */
import { Query, Resolver } from '@nestjs/graphql';
import { MajorCategoryMst } from './major-category-mst';
import { MajorCategoryMstService } from './major-category-mst.service';

@Resolver((of) => MajorCategoryMst)
export class MajorCategoryMstResolver {
  constructor(private majorCategoryMstResolver: MajorCategoryMstService) {}

  @Query((returns) => [MajorCategoryMst])
  async getAllMajorCategoryMsts() {
    return await this.majorCategoryMstResolver.getAll();
  }
}
