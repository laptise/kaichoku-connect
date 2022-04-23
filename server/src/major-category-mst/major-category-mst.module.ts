import { Module } from '@nestjs/common';
import { MajorCategoryMstService } from './major-category-mst.service';
import { MajorCategoryMstResolver } from './major-category-mst.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MajorCategoryMst } from './major-category-mst';

@Module({
  imports: [TypeOrmModule.forFeature([MajorCategoryMst])],
  providers: [MajorCategoryMstService, MajorCategoryMstResolver],
  exports: [MajorCategoryMstService],
})
export class MajorCategoryMstModule {}
