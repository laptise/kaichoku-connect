import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TradeRequestImage } from './trade-request-image';

@Injectable()
export class TradeRequestImageService {
  constructor(
    @InjectRepository(TradeRequestImage)
    private repo: Repository<TradeRequestImage>,
  ) {}

  async findById(id: number) {
    return await this.repo.findOne({ where: { id } });
  }
}
