import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { DefaultNamingStrategy, NamingStrategyInterface } from 'typeorm';
import { camelCase } from 'typeorm/util/StringUtils';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { CountryMst } from './country-mst/country-mst';
import { CountryMstModule } from './country-mst/country-mst.module';
import { MajorCategoryMst } from './major-category-mst/major-category-mst';
import { MajorCategoryMstModule } from './major-category-mst/major-category-mst.module';
import { MakerMst } from './maker-mst/maker-mst';
import { MakerMstModule } from './maker-mst/maker-mst.module';
import { MinorCategoryMst } from './minor-category-mst/minor-category-mst';
import { MinorCategoryMstModule } from './minor-category-mst/minor-category-mst.module';
import { Notification } from './notification/notification';
import { NotificationModule } from './notification/notification.module';
import { ProductMst } from './product-mst/product-mst';
import { ProductMstModule } from './product-mst/product-mst.module';
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
import { TradeRequestCommentModule } from './trade-request-comment/trade-request-comment.module';
import { TradeRequestComment } from './trade-request-comment/trade-request-comment';
import { S3Module } from './s3/s3.module';
import { S3Service } from './s3/s3.service';
import { TradeModule } from './trade/trade.module';
import { Trade } from './trade/trade';
import { ChatRoomModule } from './chat-room/chat-room.module';
import { TradeRequestCatchModule } from './trade-request-catch/trade-request-catch.module';
import { TradeRequestCatch } from './trade-request-catch/trade-request-catch';

const namingStrategy = new (class
  extends DefaultNamingStrategy
  implements NamingStrategyInterface
{
  tableName(targetName: string, userSpecifiedName: string): string {
    return userSpecifiedName || camelCase(targetName);
  }
})();
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
        CountryMst,
        Notification,
        TradeRequestComment,
        Trade,
        TradeRequestCatch,
      ],
      namingStrategy,
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
    CountryMstModule,
    NotificationModule,
    TradeRequestCommentModule,
    S3Module,
    TradeModule,
    ChatRoomModule,
    TradeRequestCatchModule,
  ],
  controllers: [AppController],
  providers: [AppService, S3Service],
})
export class AppModule {}
