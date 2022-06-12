import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BankMst } from './bank-mst';

@Injectable()
export class BankMstService {
  constructor(
    @InjectRepository(BankMst)
    private repo: Repository<BankMst>,
  ) {}

  public async getBySwiftCode(swiftCode: string) {
    return await this.repo.findOne({ swiftCode });
  }
}
