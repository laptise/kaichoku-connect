import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SignInInput, UserInput } from 'src/user/dto/newUser.input';
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

  async signInWithEmailAndPassword(data: SignInInput) {
    const { email, password } = data;
    return await this.booksRepostiory.findOne({ email, password });
  }

  async findByEmail(email: string) {
    return await this.booksRepostiory.findOne({ email });
  }
}
