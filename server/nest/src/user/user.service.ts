import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserInput } from 'src/test/dto/newUser.input copy';
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

  async create(data: UserInput) {
    await this.booksRepostiory.save(data);
    return await this.booksRepostiory.findOne({ email: data.email });
  }

  async findByEmail(email: string) {
    return await this.booksRepostiory.findOne({ email });
  }
}
