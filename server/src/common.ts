import { PageInfoType } from '@entities';
import { Field, ObjectType } from '@nestjs/graphql';

export class Common {
  testEx() {
    return '';
  }
}

export function getPageInfo<T>(
  findAndCountRes: [T[], number],
  take: number,
  skip: number,
): { nodes: T[]; pageInfo: PageInfo } {
  const [entity, totalCount] = findAndCountRes;
  const hasNextPage = (take || 0) + (skip || 0) < totalCount;
  return { nodes: entity, pageInfo: { totalCount, hasNextPage } };
}

/**通知*/
@ObjectType({ isAbstract: true })
export class PageInfo implements PageInfoType {
  @Field(() => Boolean)
  hasNextPage: boolean;
  @Field(() => Number)
  totalCount: number;
}
