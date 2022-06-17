import { JWTPayload } from '@entities';
import { UseGuards } from '@nestjs/common';
import { Query, Resolver } from '@nestjs/graphql';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { CurrentUser } from 'src/auth/guards/local-auth.guard';
import { BankInfo } from 'src/bank-info/bank-info';
import { AddressCtxMst } from './address-ctx-mst';
import { AddressCtxMstService } from './address-ctx-mst.service';

@Resolver((of) => AddressCtxMst)
export class AddressCtxMstResolver {
  constructor(private addressCtxMstService: AddressCtxMstService) {}

  @UseGuards(JwtAuthGuard) // passport-jwt戦略を付与する
  @Query(() => AddressCtxMst)
  async getAddressCtx(@CurrentUser() user: JWTPayload) {
    return await this.addressCtxMstService.getAddressCtx(user.userCountry);
  }
}
