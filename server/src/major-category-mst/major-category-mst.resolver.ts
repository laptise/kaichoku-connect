import { Resolver } from '@nestjs/graphql';
import { MajorCategoryMst } from './major-category-mst';
import { MajorCategoryMstService } from './major-category-mst.service';

@Resolver((of) => MajorCategoryMst)
export class MajorCategoryMstResolver {
  constructor(private majorCategoryMstResolver: MajorCategoryMstService) {}
}
