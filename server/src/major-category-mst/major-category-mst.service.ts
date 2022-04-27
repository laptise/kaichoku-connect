import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MajorCategoryMst } from './major-category-mst';

@Injectable()
export class MajorCategoryMstService {
  constructor(
    @InjectRepository(MajorCategoryMst)
    private repo: Repository<MajorCategoryMst>,
  ) {}

  async findById(id: number) {
    return await this.repo.findOne({ where: { id } });
  }
}
