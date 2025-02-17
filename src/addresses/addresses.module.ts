import { Module } from '@nestjs/common';
import { AddressesService } from './addresses.service';
import { AddressesController } from './addresses.controller';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  providers: [AddressesService],
  controllers: [AddressesController],
  imports: [DatabaseModule],
})
export class AddressesModule {}
