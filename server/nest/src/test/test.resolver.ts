import { NotFoundException } from '@nestjs/common';
import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { NewTestInput } from './dto/newTest.input';
import { Test } from './test';
import { TestService } from './test.service';

@Resolver((of) => Test)
export class TestResolver {
  constructor(private testService: TestService) {}
  @Query((returns) => [Test])
  tests(): Promise<Test[]> {
    return this.testService.findAll();
  }

  @Query((returns) => Test)
  async getTest(@Args({ name: 'id', type: () => Int }) id: number) {
    const book = await this.testService.findOneById(id);
    if (!book) {
      throw new NotFoundException(id);
    }
    return book;
  }

  @Mutation((returns) => Test)
  addTest(@Args('newTest') newTest: NewTestInput): Promise<Test> {
    return this.testService.create(newTest);
  }

  @Mutation((returns) => Boolean)
  async removeTest(@Args({ name: 'id', type: () => Int }) id: number) {
    return this.testService.remove(id);
  }
}
