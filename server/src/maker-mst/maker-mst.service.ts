import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NewMakerMstInput } from './dto/new-maker-mst.input';
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

  async insertWhenNeededAndGetId(data: NewMakerMstInput) {
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
