import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { createHash } from 'crypto';
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

  async findById(id: number) {
    return await this.booksRepostiory.findOne({ id });
  }

  async create(data: UserInput) {
    const hash = createHash('sha256');
    hash.update(data.password);
    const hashedPass = hash.digest('hex');
    await this.booksRepostiory.save({ ...data, ...{ password: hashedPass } });
    return await this.booksRepostiory.findOne({ email: data.email });
  }

  async signInWithEmailAndPassword(data: SignInInput) {
    const { email, password } = data;
    const hash = createHash('sha256');
    hash.update(password);
    const hashedPass = hash.digest('hex');

    return await this.booksRepostiory.findOne({ email, password: hashedPass });
  }

  async findByEmail(email: string) {
    return await this.booksRepostiory.findOne({ email });
  }
}
