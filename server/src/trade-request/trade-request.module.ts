import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MajorCategoryMst } from 'src/major-category-mst/major-category-mst';
import { MajorCategoryMstService } from 'src/major-category-mst/major-category-mst.service';
import { MakerMst } from 'src/maker-mst/maker-mst';
import { MakerMstService } from 'src/maker-mst/maker-mst.service';
import { MinorCategoryMst } from 'src/minor-category-mst/minor-category-mst';
import { MinorCategoryMstService } from 'src/minor-category-mst/minor-category-mst.service';
import { ProductMst } from 'src/product-mst/product-mst';
import { ProductMstService } from 'src/product-mst/product-mst.service';
import { TradeRequestCatch } from 'src/trade-request-catch/trade-request-catch';
import { TradeRequestCatchService } from 'src/trade-request-catch/trade-request-catch.service';
import { TradeRequestComment } from 'src/trade-request-comment/trade-request-comment';
import { TradeRequestCommentService } from 'src/trade-request-comment/trade-request-comment.service';
import { TradeRequestImageRelation } from 'src/trade-request-image-relation/trade-request-image-relation';
import { TradeRequestImageRelationService } from 'src/trade-request-image-relation/trade-request-image-relation.service';
import { TradeRequestImage } from 'src/trade-request-image/trade-request-image';
import { TradeRequestImageService } from 'src/trade-request-image/trade-request-image.service';
import { User } from 'src/user/user';
import { UserService } from 'src/user/user.service';
import { TradeRequest } from './trade-request';
import { TradeRequestResolver } from './trade-request.resolver';
import { TradeRequestService } from './trade-request.service';

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
      TradeRequestCatch,
      TradeRequestComment,
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
    TradeRequestCatchService,
    TradeRequestCommentService,
  ],
  exports: [TradeRequestService],
})
export class TradeRequestModule {}
