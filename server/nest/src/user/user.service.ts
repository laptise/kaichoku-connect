import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private booksRepostiory: Repository<User>,
  ) {}
  async findAll() {
    return await this.booksRepostiory.find();
  }
}
