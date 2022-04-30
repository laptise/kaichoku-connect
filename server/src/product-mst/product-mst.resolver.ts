import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
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

  @ResolveField('maker', (returns) => MakerMst)
  async maker(@Parent() { makerId }: ProductMst) {
    return await this.makerMstService.findById(makerId);
  }
}
