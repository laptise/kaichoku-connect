import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AddressCtxMst } from './address-ctx-mst';

@Injectable()
export class AddressCtxMstService {
  constructor(
    @InjectRepository(AddressCtxMst)
    private repo: Repository<AddressCtxMst>,
  ) {}

  public async getAddressCtx(lang: string) {
    return await this.repo.findOne({ countryCode: lang });
  }
}
