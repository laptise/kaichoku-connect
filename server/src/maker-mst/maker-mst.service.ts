import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MakerMst } from './maker-mst';

@Injectable()
export class MakerMstService {
  constructor(
    @InjectRepository(MakerMst)
    private repo: Repository<MakerMst>,
  ) {}

  async findById(id: number) {
    return await this.repo.findOne({ id });
  }

  async findAll() {
    return await this.repo.find();
  }
}
