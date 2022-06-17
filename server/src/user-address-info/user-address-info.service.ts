import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpsertUserAddressInput } from './dto/upsert-user-address.input';
import { UserAddressInfo } from './user-address-info';

@Injectable()
export class UserAddressInfoService {
  constructor(
    @InjectRepository(UserAddressInfo)
    private repo: Repository<UserAddressInfo>,
  ) {}

  public async getByUserId(userId: string) {
    return this.repo.findOne({ userId });
  }

  public async upsertUserAddress(data: UpsertUserAddressInput) {
    return await this.repo.save(data);
  }
}
