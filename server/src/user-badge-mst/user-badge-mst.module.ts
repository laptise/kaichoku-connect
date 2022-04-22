import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserBadgeMst } from './user-badge-mst';
import { UserBadgeMstResolver } from './user-badge-mst.resolver';
import { UserBadgeMstService } from './user-badge-mst.service';

@Module({
  imports: [TypeOrmModule.forFeature([UserBadgeMst])],
  providers: [UserBadgeMstResolver, UserBadgeMstService],
  exports: [UserBadgeMstService],
})
export class UserBadgeMstModule {}
