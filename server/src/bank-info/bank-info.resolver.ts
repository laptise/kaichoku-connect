import { JWTPayload } from '@entities';
import { UseGuards } from '@nestjs/common';
import { Args, Query, Resolver } from '@nestjs/graphql';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { CurrentUser } from 'src/auth/guards/local-auth.guard';
import { BankMstService } from 'src/bank-mst/bank-mst.service';
import { BankNameMstService } from 'src/bank-name-mst/bank-name-mst.service';
import { BankInfo } from './bank-info';

@Resolver((of) => BankInfo)
export class BankInfoResolver {
  constructor(
    private bankMstService: BankMstService,
    private bankNameMstService: BankNameMstService,
  ) {}

  @Query(() => [BankInfo])
  public async getBanks(@Args('countryCode') countryCode: string) {
    const mst = await this.bankMstService.getAllByCountryCode(countryCode);
    return await Promise.all(
      mst.map(async (m) => {
        const { name, imgUrl } =
          await this.bankNameMstService.getByLangAndSwiftCode(
            countryCode,
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

  @UseGuards(JwtAuthGuard) // passport-jwt戦略を付与する
  @Query(() => [BankInfo])
  public async getBanksByUserLang(
    @CurrentUser() user: JWTPayload,
  ): Promise<BankInfo[]> {
    const mst = await this.bankMstService.getAllByCountryCode(user.userCountry);
    return await Promise.all(
      mst.map(async (m) => {
        const { name, imgUrl } =
          await this.bankNameMstService.getByLangAndSwiftCode(
            user.userCountry,
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
}
