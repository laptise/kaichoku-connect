import { Resolver } from '@nestjs/graphql';
import { CountryMst } from './country-mst';
import { CountryMstService } from './country-mst.service';

@Resolver((of) => CountryMst)
export class CountryMstResolver {
  constructor(private countryMstService: CountryMstService) {}
}
