import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { BankMst } from 'src/bank-mst/bank-mst';
import { BankMstService } from 'src/bank-mst/bank-mst.service';
import { BankNameMst } from 'src/bank-name-mst/bank-name-mst';
import { BankNameMstService } from 'src/bank-name-mst/bank-name-mst.service';
import { UserBankInfo } from './user-bank-info';
import { UserBankInfoService } from './user-bank-info.service';

@Resolver((of) => UserBankInfo)
export class UserBankInfoResolver {
  constructor(
    private userBankInfoService: UserBankInfoService,
    private bankMstService: BankMstService,
    private bankNameService: BankNameMstService,
  ) {}

  @ResolveField('bank', () => BankNameMst)
  async getBankName(@Parent() userBank: UserBankInfo) {
    const mst = await this.bankMstService.getBySwiftCode(userBank.swiftCode);
    return await this.bankNameService.getByLangAndSwiftCode(
      'jpn',
      mst.swiftCode,
    );
  }
}
