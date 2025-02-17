import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { DatabaseModule } from 'src/database/database.module';
import { RoleModule } from 'src/role/role.module';
import { DistributorModule } from 'src/distributor/distributor.module';

@Module({
  imports: [DatabaseModule, RoleModule, DistributorModule],
  controllers: [UserController],
  providers: [UserService]
})
export class UserModule {}
