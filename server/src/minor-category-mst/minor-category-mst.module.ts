import { Module } from '@nestjs/common';
import { MinorCategoryMstService } from './minor-category-mst.service';
import { MinorCategoryMstResolver } from './minor-category-mst.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MinorCategoryMst } from './minor-category-mst';
import { MajorCategoryMst } from 'src/major-category-mst/major-category-mst';
import { MajorCategoryMstService } from 'src/major-category-mst/major-category-mst.service';

@Module({
  imports: [TypeOrmModule.forFeature([MinorCategoryMst, MajorCategoryMst])],
  providers: [
    MinorCategoryMstService,
    MinorCategoryMstResolver,
    MajorCategoryMstService,
  ],
  exports: [MinorCategoryMstService],
})
export class MinorCategoryMstModule {}
