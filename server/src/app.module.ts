import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { User } from './user/user';
import { DefaultNamingStrategy } from 'typeorm';
import { snakeCase } from 'typeorm/util/StringUtils';
import { AuthModule } from './auth/auth.module';
import { TradeRequestModule } from './trade-request/trade-request.module';
import { TradeRequest } from './trade-request/trade-request';
import { UserBadgeMstModule } from './user-badge-mst/user-badge-mst.module';
import { UserBadgeMst } from './user-badge-mst/user-badge-mst';
import { UserBadgeStatusModule } from './user-badge-status/user-badge-status.module';
import { UserBadgeStatus } from './user-badge-status/user-badge-status';
const namingStrategy = new (class extends DefaultNamingStrategy {
  columnName(propertyName: string, customName: string): string {
    return customName ? customName : snakeCase(propertyName);
  }
  tableName(targetName: string, userSpecifiedName: string): string {
    return userSpecifiedName ? userSpecifiedName : snakeCase(targetName);
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
      namingStrategy,
      type: 'mysql',
      host: 'db',
      username: 'root',
      password: process.env.ROOT_PASSWORD,
      database: 'KAICHOKU_CONNECT',
      entities: [User, TradeRequest, UserBadgeMst, UserBadgeStatus],
      synchronize: true,
    }),
    UserModule,
    AuthModule,
    TradeRequestModule,
    UserBadgeMstModule,
    UserBadgeStatusModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
