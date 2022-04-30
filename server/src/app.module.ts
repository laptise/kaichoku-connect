import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { MajorCategoryMst } from './major-category-mst/major-category-mst';
import { MajorCategoryMstModule } from './major-category-mst/major-category-mst.module';
import { MakerMst } from './maker-mst/maker-mst';
import { MakerMstModule } from './maker-mst/maker-mst.module';
import { MinorCategoryMst } from './minor-category-mst/minor-category-mst';
import { MinorCategoryMstModule } from './minor-category-mst/minor-category-mst.module';
import { TradeRequestImageRelation } from './trade-request-image-relation/trade-request-image-relation';
import { TradeRequestImageRelationModule } from './trade-request-image-relation/trade-request-image-relation.module';
import { TradeRequestImage } from './trade-request-image/trade-request-image';
import { TradeRequestImageModule } from './trade-request-image/trade-request-image.module';
import { TradeRequest } from './trade-request/trade-request';
import { TradeRequestModule } from './trade-request/trade-request.module';
import { UserBadgeMst } from './user-badge-mst/user-badge-mst';
import { UserBadgeMstModule } from './user-badge-mst/user-badge-mst.module';
import { UserBadgeStatus } from './user-badge-status/user-badge-status';
import { UserBadgeStatusModule } from './user-badge-status/user-badge-status.module';
import { User } from './user/user';
import { UserModule } from './user/user.module';
import { ProductMstModule } from './product-mst/product-mst.module';
import { ProductMst } from './product-mst/product-mst';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      driver: ApolloDriver,
      subscriptions: {
        'graphql-ws': true,
        'subscriptions-transport-ws': true,
      },
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'db',
      username: 'root',
      password: process.env.ROOT_PASSWORD,
      database: 'kaichoku_connect',
      entities: [
        User,
        TradeRequest,
        UserBadgeMst,
        UserBadgeStatus,
        MajorCategoryMst,
        MinorCategoryMst,
        TradeRequestImage,
        TradeRequestImageRelation,
        MakerMst,
        ProductMst,
      ],
      synchronize: true,
    }),
    UserModule,
    AuthModule,
    TradeRequestModule,
    UserBadgeMstModule,
    UserBadgeStatusModule,
    MajorCategoryMstModule,
    MinorCategoryMstModule,
    TradeRequestImageRelationModule,
    TradeRequestImageModule,
    MakerMstModule,
    ProductMstModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
