import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CountryMst } from './country-mst';

@Injectable()
export class CountryMstService {
  constructor(
    @InjectRepository(CountryMst)
    private repo: Repository<CountryMst>,
  ) {}
}
