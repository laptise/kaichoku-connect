import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserBadgeMst } from './user-badge-mst';

@Injectable()
export class UserBadgeMstService {
  constructor(
    @InjectRepository(UserBadgeMst)
    private repo: Repository<UserBadgeMst>,
  ) {}

  async findBadgeWithId(id: number) {
    return await this.repo.findOne({ where: { id } });
  }
}
