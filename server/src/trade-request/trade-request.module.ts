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
import { TradeRequestImage } from 'src/trade-request-image/trade-request-image';
import { TradeRequestImageRelation } from 'src/trade-request-image-relation/trade-request-image-relation';
import { TradeRequestImageService } from 'src/trade-request-image/trade-request-image.service';
import { TradeRequestImageRelationService } from 'src/trade-request-image-relation/trade-request-image-relation.service';
import { MakerMst } from 'src/maker-mst/maker-mst';
import { MakerMstService } from 'src/maker-mst/maker-mst.service';
import { ProductMst } from 'src/product-mst/product-mst';
import { ProductMstService } from 'src/product-mst/product-mst.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      TradeRequest,
      User,
      MajorCategoryMst,
      MinorCategoryMst,
      TradeRequestImage,
      TradeRequestImageRelation,
      MakerMst,
      ProductMst,
    ]),
  ],
  providers: [
    TradeRequestService,
    TradeRequestResolver,
    UserService,
    MajorCategoryMstService,
    MinorCategoryMstService,
    TradeRequestImageService,
    TradeRequestImageRelationService,
    MakerMstService,
    ProductMstService,
  ],
  exports: [TradeRequestService],
})
export class TradeRequestModule {}
