import { Module } from '@nestjs/common';
import { UserBankInfoService } from './user-bank-info.service';
import { UserBankInfoResolver } from './user-bank-info.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserBankInfo } from './user-bank-info';
import { BankMst } from 'src/bank-mst/bank-mst';
import { BankMstService } from 'src/bank-mst/bank-mst.service';
import { BankNameMstService } from 'src/bank-name-mst/bank-name-mst.service';
import { BankNameMst } from 'src/bank-name-mst/bank-name-mst';

@Module({
  imports: [TypeOrmModule.forFeature([UserBankInfo, BankMst, BankNameMst])],
  providers: [
    UserBankInfoService,
    UserBankInfoResolver,
    BankMstService,
    BankNameMstService,
  ],
})
export class UserBankInfoModule {}
