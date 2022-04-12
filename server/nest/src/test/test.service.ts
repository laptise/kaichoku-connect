import { Injectable } from '@nestjs/common';
import { NewTestInput } from './dto/newTest.input';
import { Test } from './test';

let tests = [
  { id: 444, value: 'adad' },
  { id: 124, value: 'ddaa' },
];

@Injectable()
export class TestService {
  findAll(): Promise<Test[]> {
    return Promise.resolve(tests);
  }
  findOneById(id: number): Promise<Test> {
    const book = tests.find((book) => book.id === id);
    return Promise.resolve(book);
  }
  create(data: NewTestInput): Promise<Test> {
    const book: Test = {
      ...data,
    };
    tests.push(book);

    return Promise.resolve(book);
  }
  async remove(id: number): Promise<boolean> {
    tests = tests.filter((book) => book.id !== id);
    return true;
  }
}
