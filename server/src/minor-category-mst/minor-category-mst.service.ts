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
      const res = await this.repo
        .createQueryBuilder('minorCategoryMst')
        .select(['MAX(minorCategoryMst.id) AS cnt'])
        .where('minorCategoryMst.majorId = :MajorId', {
          MajorId: toAdd.majorId,
        })
        .groupBy('minorCategoryMst.majorId')
        .getRawOne();
      const maxId = res?.cnt || 0;
      return await this.repo
        .create({ ...toAdd, ...{ id: maxId + 1 } })
        .save()
        .then((data) => data.id);
    }
  }
}
