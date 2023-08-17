import { Module } from '@nestjs/common';
import { AdminModule } from 'src/admin/admin.module';

@Module({
  imports: [AdminModule],
  providers: [],
  controllers: [],
  exports: [],
})
export class AdminAppModule {}
