import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BankNameMst } from './bank-name-mst';

@Injectable()
export class BankNameMstService {
  constructor(
    @InjectRepository(BankNameMst)
    private repo: Repository<BankNameMst>,
  ) {}

  public async getByLangAndSwiftCode(lang: string, swiftCode: string) {
    return await this.repo.findOne({ swiftCode, lang });
  }
}
