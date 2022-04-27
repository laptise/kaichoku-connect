import { Module } from '@nestjs/common';
import { TradeRequestService } from './trade-request.service';
import { TradeRequestResolver } from './trade-request.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TradeRequest } from './trade-request';
import { UserService } from 'src/user/user.service';
import { UserModule } from 'src/user/user.module';
import { User } from 'src/user/user';
import { MajorCategoryMst } from 'src/major-category-mst/major-category-mst';
import { MajorCategoryMstService } from 'src/major-category-mst/major-category-mst.service';
import { MinorCategoryMstService } from 'src/minor-category-mst/minor-category-mst.service';
import { MinorCategoryMst } from 'src/minor-category-mst/minor-category-mst';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      TradeRequest,
      User,
      MajorCategoryMst,
      MinorCategoryMst,
    ]),
  ],
  providers: [
    TradeRequestService,
    TradeRequestResolver,
    UserService,
    MajorCategoryMstService,
    MinorCategoryMstService,
  ],
  exports: [TradeRequestService],
})
export class TradeRequestModule {}
