import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AddressCtxMst } from './address-ctx-mst';
import { AddressCtxMstResolver } from './address-ctx-mst.resolver';
import { AddressCtxMstService } from './address-ctx-mst.service';

@Module({
  imports: [TypeOrmModule.forFeature([AddressCtxMst])],
  providers: [AddressCtxMstResolver, AddressCtxMstService],
})
export class AddressCtxMstModule {}
