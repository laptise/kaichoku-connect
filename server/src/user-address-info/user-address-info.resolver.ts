/* eslint-disable @typescript-eslint/no-unused-vars */
import { JWTPayload } from '@entities';
import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { CurrentUser } from 'src/auth/guards/local-auth.guard';
import { UpsertUserAddressInput } from './dto/upsert-user-address.input';
import { UserAddressInfo } from './user-address-info';
import { UserAddressInfoService } from './user-address-info.service';

@Resolver((of) => UserAddressInfo)
export class UserAddressInfoResolver {
  constructor(private userAddressInfoService: UserAddressInfoService) {}

  @Query((returns) => UserAddressInfo, { nullable: true })
  public async getUserAddressByUserId(@Args('userId') userId: string) {
    return await this.userAddressInfoService.getByUserId(userId);
  }

  @UseGuards(JwtAuthGuard) // passport-jwt戦略を付与する
  @Query((returns) => UserAddressInfo, { nullable: true })
  public async getSelfAddress(@CurrentUser() user: JWTPayload) {
    return await this.getUserAddressByUserId(user.userId);
  }

  @UseGuards(JwtAuthGuard)
  @Mutation((returns) => UserAddressInfo)
  public async upsertUserAddressInfo(
    @CurrentUser() user: JWTPayload,
    @Args('data') data: UpsertUserAddressInput,
  ) {
    return await this.userAddressInfoService.upsertUserAddress({
      ...data,
      ...{ userId: user.userId },
    });
  }
}
