import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductMst } from './product-mst';

@Injectable()
export class ProductMstService {
  constructor(
    @InjectRepository(ProductMst)
    private repo: Repository<ProductMst>,
  ) {}

  async findById(makerId: number, id: number) {
    return await this.repo.findOne({ id, makerId });
  }
}
