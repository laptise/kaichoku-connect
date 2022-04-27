import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { MajorCategoryMst } from 'src/major-category-mst/major-category-mst';
import { MajorCategoryMstService } from 'src/major-category-mst/major-category-mst.service';
import { MinorCategoryMst } from './minor-category-mst';
import { MinorCategoryMstService } from './minor-category-mst.service';

@Resolver((of) => MinorCategoryMst)
export class MinorCategoryMstResolver {
  constructor(
    private minorCategoryMst: MinorCategoryMstService,
    private majorCategroyMstService: MajorCategoryMstService,
  ) {}

  @ResolveField('majorCategory', () => MajorCategoryMst)
  async majorCategory(@Parent() minorCategoryMst: MinorCategoryMst) {
    return await this.majorCategroyMstService.findById(
      minorCategoryMst.majorId,
    );
  }
}
