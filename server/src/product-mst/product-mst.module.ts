import { Module } from '@nestjs/common';
import { ProductMstService } from './product-mst.service';
import { ProductMstResolver } from './product-mst.resolver';

@Module({
  providers: [ProductMstService, ProductMstResolver]
})
export class ProductMstModule {}
