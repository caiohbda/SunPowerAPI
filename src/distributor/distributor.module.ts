import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { DistributorController } from './distributor.controller';
import { DistributorService } from './distributor.service';

@Module({
  imports: [DatabaseModule],
  controllers: [DistributorController],
  providers: [DistributorService],
})
export class DistributorModule {}
