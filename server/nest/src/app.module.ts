import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { TestModule } from './test/test.module';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Test } from './test/test';
import { ConfigModule } from '@nestjs/config';
@Module({
  imports: [
    ConfigModule.forRoot(),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      driver: ApolloDriver,
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'db',
      username: 'root',
      password: process.env.ROOT_PASSWORD,
      database: 'KAICHOKU_CONNECT',
      entities: [Test],
      synchronize: false,
    }),
    TestModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
