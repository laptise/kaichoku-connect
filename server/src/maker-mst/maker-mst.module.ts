import { Module } from '@nestjs/common';
import { MakerMstService } from './maker-mst.service';
import { MakerMstResolver } from './maker-mst.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MakerMst } from './maker-mst';

@Module({
  imports: [TypeOrmModule.forFeature([MakerMst])],
  providers: [MakerMstService, MakerMstResolver],
})
export class MakerMstModule {}
