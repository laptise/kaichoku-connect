import { Resolver } from '@nestjs/graphql';
import { MinorCategoryMst } from './minor-category-mst';
import { MinorCategoryMstService } from './minor-category-mst.service';

@Resolver((of) => MinorCategoryMst)
export class MinorCategoryMstResolver {
  constructor(private minorCategoryMst: MinorCategoryMstService) {}
}
