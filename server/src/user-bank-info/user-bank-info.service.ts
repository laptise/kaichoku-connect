import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserBankInfo } from './user-bank-info';

@Injectable()
export class UserBankInfoService {
  constructor(
    @InjectRepository(UserBankInfo)
    private repo: Repository<UserBankInfo>,
  ) {}

  public async getByUserId(userId: string) {
    return await this.repo.findOne({ userId });
  }
}
