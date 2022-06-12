import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BankMst } from 'src/bank-mst/bank-mst';
import { BankMstService } from 'src/bank-mst/bank-mst.service';
import { BankNameMst } from 'src/bank-name-mst/bank-name-mst';
import { BankNameMstService } from 'src/bank-name-mst/bank-name-mst.service';
import { BankInfoResolver } from './bank-info.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([BankMst, BankNameMst])],
  providers: [BankInfoResolver, BankMstService, BankNameMstService],
})
export class BankInfoModule {}
