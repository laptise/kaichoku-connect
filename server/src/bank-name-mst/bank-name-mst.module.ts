import { Module } from '@nestjs/common';
import { BankNameMstService } from './bank-name-mst.service';
import { BankNameMstResolver } from './bank-name-mst.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BankNameMst } from './bank-name-mst';

@Module({
  imports: [TypeOrmModule.forFeature([BankNameMst])],
  providers: [BankNameMstService, BankNameMstResolver],
})
export class BankNameMstModule {}
