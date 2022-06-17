import { Module } from '@nestjs/common';
import { UserAddressInfoService } from './user-address-info.service';
import { UserAddressInfoResolver } from './user-address-info.resolver';
import { UserAddressInfo } from './user-address-info';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([UserAddressInfo])],
  providers: [UserAddressInfoService, UserAddressInfoResolver],
})
export class UserAddressInfoModule {}
