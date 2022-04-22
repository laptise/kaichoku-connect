import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { UserBadgeMst } from 'src/user-badge-mst/user-badge-mst';
import { UserBadgeMstService } from 'src/user-badge-mst/user-badge-mst.service';
import { UserBadgeStatus } from './user-badge-status';
import { UserBadgeStatusService } from './user-badge-status.service';

@Resolver((of) => UserBadgeStatus)
export class UserBadgeStatusResolver {
  constructor(
    private badgeStatusService: UserBadgeStatusService,
    private badgeMstService: UserBadgeMstService,
  ) {}

  @ResolveField('badgeInfo', (returns) => UserBadgeMst)
  async badgeInfo(@Parent() badgeUsingStatus: UserBadgeStatus) {
    return await this.badgeMstService.findBadgeWithId(badgeUsingStatus.badgeId);
  }
}
