/* eslint-disable @typescript-eslint/no-unused-vars */
import { JWTPayload } from '@entities';
import { UseGuards } from '@nestjs/common';
import {
  Args,
  Mutation,
  Parent,
  Query,
  registerEnumType,
  ResolveField,
  Resolver,
  Subscription,
} from '@nestjs/graphql';
import { PubSub } from 'graphql-subscriptions';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { CurrentUser } from 'src/auth/guards/local-auth.guard';
import { Countries } from 'src/country-mst/dto/countries';
import { MajorCategoryMst } from 'src/major-category-mst/major-category-mst';
import { MajorCategoryMstService } from 'src/major-category-mst/major-category-mst.service';
import { MakerMst } from 'src/maker-mst/maker-mst';
import { MakerMstService } from 'src/maker-mst/maker-mst.service';
import { MinorCategoryMst } from 'src/minor-category-mst/minor-category-mst';
import { MinorCategoryMstService } from 'src/minor-category-mst/minor-category-mst.service';
import { ProductMst } from 'src/product-mst/product-mst';
import { ProductMstService } from 'src/product-mst/product-mst.service';
import { TradeRequestImageRelationService } from 'src/trade-request-image-relation/trade-request-image-relation.service';
import { TradeRequestImage } from 'src/trade-request-image/trade-request-image';
import { TradeRequestImageService } from 'src/trade-request-image/trade-request-image.service';
import { User } from 'src/user/user';
import { UserService } from 'src/user/user.service';
import { NewTradeRequestInput } from './dto/new-trade-request.input';
import { TradeRequest } from './trade-request';
import { TradeRequestService } from './trade-request.service';

registerEnumType(Countries, {
  name: 'Countries',
});

const requestAdded = new PubSub();

@Resolver((of) => TradeRequest)
export class TradeRequestResolver {
  constructor(
    private tradeService: TradeRequestService,
    private userService: UserService,
    private majorCategoryMstService: MajorCategoryMstService,
    private minorCategoryMstService: MinorCategoryMstService,
    private tradeRequestImageService: TradeRequestImageService,
    private tradeRequestImageRelationService: TradeRequestImageRelationService,
    private makerMstService: MakerMstService,
    private productMstService: ProductMstService,
  ) {}

  @UseGuards(JwtAuthGuard) // passport-jwt戦略を付与する
  @Mutation((returns) => TradeRequest)
  async addNewTradeRequest(
    @Args('data') data: NewTradeRequestInput,
    @CurrentUser() user: JWTPayload,
  ) {
    console.log(data);
    const minorCategoryId =
      await this.minorCategoryMstService.insertWhenNeededAndGetId(
        data.minorCategory,
      );
    console.log('minor success');

    const makerId = await this.makerMstService.insertWhenNeededAndGetId(
      data.maker,
    );
    console.log('maker success');
    data.product.makerId = makerId;
    const productId = await this.productMstService.insertWhenNeededAndGetId(
      data.product,
    );
    console.log('productId success');

    const newRequest = await this.tradeService.addNewTradeRequest(
      { ...data, minorCategoryId, makerId, productId },
      user,
    );
    console.log('newRequest success');

    const recentItems = await this.tradeService.getTradeRequests(10, '');
    requestAdded.publish('newRequests', {
      newRequests: recentItems,
    });
    return newRequest;
  }

  @Query((returns) => [TradeRequest])
  async getTradeRequests(
    @Args('limit', { name: 'limit', nullable: true, defaultValue: 100 })
    limit: number,
    @Args('countryCode', { type: () => Countries, nullable: true })
    countryCode: string,
    @Args('ownerId', { nullable: true, defaultValue: '' })
    ownerId: string,
  ) {
    return await this.tradeService.getTradeRequests(
      limit,
      ownerId,
      countryCode,
    );
  }

  @Query(() => TradeRequest)
  async getTradeRequestById(
    @Args('id', { name: 'id', nullable: false })
    id: number,
  ) {
    return await this.tradeService.getTradeRequstById(id);
  }

  @Subscription((returns) => [TradeRequest], { name: 'newRequests' })
  getLatestTradeRequests() {
    return requestAdded.asyncIterator('newRequests');
  }

  @ResolveField('owner', (returns) => User)
  async owner(@Parent() tradeRequest: TradeRequest) {
    console.log(tradeRequest);
    return await this.userService.findById(tradeRequest.ownerId);
  }

  @ResolveField('majorCategory', () => MajorCategoryMst)
  async majorCategory(@Parent() tradeRequest: TradeRequest) {
    return await this.majorCategoryMstService.findById(
      tradeRequest.majorCategoryId,
    );
  }

  @ResolveField('minorCategory', () => MinorCategoryMst)
  async minorCategory(@Parent() tradeRequest: TradeRequest) {
    return await this.minorCategoryMstService.findById(
      tradeRequest.majorCategoryId,
      tradeRequest.minorCategoryId,
    );
  }

  @ResolveField('maker', (returns) => MakerMst)
  async maker(@Parent() tradeRequest: TradeRequest) {
    return await this.makerMstService.findById(tradeRequest.makerId);
  }

  @ResolveField('product', (returns) => ProductMst)
  async product(@Parent() { makerId, productId }: TradeRequest) {
    return await this.productMstService.findById(makerId, productId);
  }

  @ResolveField('images', () => [TradeRequestImage])
  async images(@Parent() tradeRequest: TradeRequest) {
    const relations =
      await this.tradeRequestImageRelationService.getByTradeRequestId(
        tradeRequest.id,
      );
    return await Promise.all(
      relations.map(({ tradeRequestImageId }) =>
        this.tradeRequestImageService.findById(tradeRequestImageId),
      ),
    );
  }
}
