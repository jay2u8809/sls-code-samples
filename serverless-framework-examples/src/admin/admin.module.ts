import { Module } from '@nestjs/common';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';
import { MiscModule } from '../misc/misc.module';

@Module({
  imports: [MiscModule],
  providers: [AdminService],
  controllers: [AdminController],
  exports: [],
})
export class AdminModule {}
