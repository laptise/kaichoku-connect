import { Module } from '@nestjs/common';
import { ProductMstService } from './product-mst.service';
import { ProductMstResolver } from './product-mst.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductMst } from './product-mst';
import { MakerMst } from 'src/maker-mst/maker-mst';
import { MakerMstService } from 'src/maker-mst/maker-mst.service';

@Module({
  imports: [TypeOrmModule.forFeature([ProductMst, MakerMst])],
  providers: [ProductMstService, ProductMstResolver, MakerMstService],
})
export class ProductMstModule {}
