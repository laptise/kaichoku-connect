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
    private repo: Repository<User>,
  ) {}
  async findAll() {
    return await this.repo.find();
  }

  async findById(id: string) {
    return await this.repo.findOne({ id });
  }

  async create(data: UserInput) {
    const hash = createHash('sha256');
    hash.update(data.password);
    const hashedPass = hash.digest('hex');
    await this.repo.save({ ...data, ...{ password: hashedPass } });
    return await this.repo.findOne({ email: data.email });
  }

  async signInWithEmailAndPassword(data: SignInInput) {
    const { email, password } = data;
    const hash = createHash('sha256');
    hash.update(password);
    const hashedPass = hash.digest('hex');

    return await this.repo.findOne({ email, password: hashedPass });
  }

  async findByEmail(email: string) {
    return await this.repo.findOne({ email });
  }

  async updateUserProfileImage(id: string, imgUrl: string) {
    const user = await this.findById(id);
    user.imgUrl = imgUrl;
    await this.repo.save(user);
  }
}
