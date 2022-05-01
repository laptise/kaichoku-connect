/* eslint-disable @typescript-eslint/no-unused-vars */
import { Args, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { MakerMst } from 'src/maker-mst/maker-mst';
import { MakerMstService } from 'src/maker-mst/maker-mst.service';
import { ProductMst } from './product-mst';
import { ProductMstService } from './product-mst.service';

@Resolver((of) => ProductMst)
export class ProductMstResolver {
  constructor(
    private makerMstService: MakerMstService,
    private productMstService: ProductMstService,
  ) {}

  @Query((returns) => [ProductMst])
  async getProductsByMakerId(
    @Args('makerId', { nullable: false })
    makerId: number,
  ) {
    return await this.productMstService.findByMakerId(makerId);
  }

  @ResolveField('maker', (returns) => MakerMst)
  async maker(@Parent() { makerId }: ProductMst) {
    return await this.makerMstService.findById(makerId);
  }
}
