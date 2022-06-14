import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UpdateBankInfoInput } from 'src/bank-info/dto/update-bank-info.input';
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

  public async updateUserBankInfo(userId: string, data: UpdateBankInfoInput) {
    const { swiftCode, accountNo, accountType, branchCode, accountName } = data;
    return await this.repo
      .create({
        userId,
        swiftCode,
        accountNo,
        accountType,
        branchCode,
        accountName,
      })
      .save();
  }
}
