import { Module } from '@nestjs/common';
import { MinorCategoryMstService } from './minor-category-mst.service';
import { MinorCategoryMstResolver } from './minor-category-mst.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MinorCategoryMst } from './minor-category-mst';

@Module({
  imports: [TypeOrmModule.forFeature([MinorCategoryMst])],
  providers: [MinorCategoryMstService, MinorCategoryMstResolver],
  exports: [MinorCategoryMstService],
})
export class MinorCategoryMstModule {}
