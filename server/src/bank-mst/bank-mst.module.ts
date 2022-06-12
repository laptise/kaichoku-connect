import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BankMst } from './bank-mst';
import { BankMstService } from './bank-mst.service';

@Module({
  imports: [TypeOrmModule.forFeature([BankMst])],
  providers: [BankMstService],
})
export class BankMstModule {}
