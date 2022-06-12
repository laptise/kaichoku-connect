import { JWTPayload } from '@entities';
import { UseGuards } from '@nestjs/common';
import { Args, Query, Resolver } from '@nestjs/graphql';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { CurrentUser } from 'src/auth/guards/local-auth.guard';
import { BankMstService } from 'src/bank-mst/bank-mst.service';
import { BankNameMstService } from 'src/bank-name-mst/bank-name-mst.service';
import { UserBankInfoService } from 'src/user-bank-info/user-bank-info.service';
import { BankInfo } from './bank-info';

@Resolver((of) => BankInfo)
export class BankInfoResolver {
  constructor(
    private bankMstService: BankMstService,
    private bankNameMstService: BankNameMstService,
  ) {}

  private async getBankInfoByCountryCode(lang: string) {
    const mst = await this.bankMstService.getAllByCountryCode(lang);
    return await Promise.all(
      mst.map(async (m) => {
        const { name, imgUrl } =
          await this.bankNameMstService.getByLangAndSwiftCode(
            lang,
            m.swiftCode,
          );
        return {
          swiftCode: m.swiftCode,
          name,
          imgUrl,
          isBranchNeeded: m.isBranchNeeded,
          isAccountTypeNeeded: m.isAccountTypeNeeded,
        };
      }),
    );
  }

  @Query(() => [BankInfo])
  public async getBanks(@Args('countryCode') countryCode: string) {
    return this.getBankInfoByCountryCode(countryCode);
  }

  @UseGuards(JwtAuthGuard) // passport-jwt戦略を付与する
  @Query(() => [BankInfo])
  public async getBanksByUserLang(
    @CurrentUser() user: JWTPayload,
  ): Promise<BankInfo[]> {
    return await this.getBankInfoByCountryCode(user.userCountry);
  }
}
