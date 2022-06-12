import { JWTPayload } from '@entities';
import { UseGuards } from '@nestjs/common';
import {
  Args,
  Mutation,
  Parent,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { CurrentUser } from 'src/auth/guards/local-auth.guard';
import { BankInfo } from 'src/bank-info/bank-info';
import { UpdateBankInfoInput } from 'src/bank-info/dto/update-bank-info.input';
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

  @UseGuards(JwtAuthGuard) // passport-jwt戦略を付与する
  @Mutation(() => BankInfo)
  public async updateBankInfo(
    @Args('data') data: UpdateBankInfoInput,
    @CurrentUser() user: JWTPayload,
  ) {
    return await this.userBankInfoService.updateUserBankInfo(user.userId, data);
  }
}
