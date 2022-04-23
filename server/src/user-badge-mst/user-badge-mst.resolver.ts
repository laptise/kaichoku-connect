import { Resolver } from '@nestjs/graphql';
import { UserBadgeMst } from './user-badge-mst';
import { UserBadgeMstService } from './user-badge-mst.service';

@Resolver((of) => UserBadgeMst)
export class UserBadgeMstResolver {
  constructor(private userBadgeMstService: UserBadgeMstService) {}
}
