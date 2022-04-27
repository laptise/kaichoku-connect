import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MinorCategoryMst } from './minor-category-mst';

@Injectable()
export class MinorCategoryMstService {
  constructor(
    @InjectRepository(MinorCategoryMst)
    private repo: Repository<MinorCategoryMst>,
  ) {}

  async findById(majorId: number, id: number) {
    return await this.repo.findOne({ where: { id, majorId } });
  }
}
