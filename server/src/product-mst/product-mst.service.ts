import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NewProductMstInput } from './dto/new-product-mst.input';
import { ProductMst } from './product-mst';

@Injectable()
export class ProductMstService {
  constructor(
    @InjectRepository(ProductMst)
    private repo: Repository<ProductMst>,
  ) {}

  async findByMakerId(makerId: number) {
    return await this.repo.find({ makerId });
  }

  async findById(makerId: number, id: number) {
    return await this.repo.findOne({ id, makerId });
  }

  async insertWhenNeededAndGetId(data: NewProductMstInput) {
    if (Number(data.id)) {
      return data.id;
    } else {
      const { id, ...toAdd } = data;
      return await this.repo
        .create(toAdd)
        .save()
        .then((data) => data.id);
    }
  }
}
