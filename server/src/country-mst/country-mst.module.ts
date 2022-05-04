import { Module } from '@nestjs/common';
import { CountryMstService } from './country-mst.service';
import { CountryMstResolver } from './country-mst.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CountryMst } from './country-mst';

@Module({
  imports: [TypeOrmModule.forFeature([CountryMst])],
  providers: [CountryMstService, CountryMstResolver],
})
export class CountryMstModule {}
