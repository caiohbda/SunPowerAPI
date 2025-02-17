import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { DatabaseModule } from './database/database.module';
import { DistributorService } from './distributor/distributor.service';
import { DistributorController } from './distributor/distributor.controller';
import { DistributorModule } from './distributor/distributor.module';
import { RoleModule } from './role/role.module';

@Module({
  imports: [AuthModule, UserModule, DatabaseModule, DistributorModule, RoleModule],
  controllers: [AppController, DistributorController],
  providers: [AppService, DistributorService],
})
export class AppModule {}
