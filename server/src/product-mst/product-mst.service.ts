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
      const res = await this.repo
        .createQueryBuilder('productMst')
        .select(['MAX(productMst.id) AS cnt'])
        .where('productMst.makerId = :MakerId', { MakerId: toAdd.makerId })
        .groupBy('productMst.makerId')
        .getRawOne();
      const maxId = res?.cnt || 0;
      return await this.repo
        .create({ ...toAdd, ...{ id: maxId + 1 } })
        .save()
        .then((data) => data.id);
    }
  }
}
