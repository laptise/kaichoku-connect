import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AddressCtxMst } from './address-ctx-mst';

@Module({ imports: [TypeOrmModule.forFeature([AddressCtxMst])] })
export class AddressCtxMstModule {}
