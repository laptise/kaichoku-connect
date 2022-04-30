import { Module } from '@nestjs/common';
import { ProductMstService } from './product-mst.service';
import { ProductMstResolver } from './product-mst.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductMst } from './product-mst';

@Module({
  imports: [TypeOrmModule.forFeature([ProductMst])],
  providers: [ProductMstService, ProductMstResolver],
})
export class ProductMstModule {}
