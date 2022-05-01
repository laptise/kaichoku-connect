import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NewMinorCategoryInput } from './dto/new-minor-category.input';
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

  async findByMajorId(majorId: number) {
    return await this.repo.find({ majorId });
  }

  async insertWhenNeededAndGetId(data: NewMinorCategoryInput) {
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
