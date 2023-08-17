import { Module } from '@nestjs/common';
import { MiscModule } from '../misc/misc.module';
import { MiscService } from '../misc/misc.service';
import { MiscController } from '../misc/misc.controller';

@Module({
  imports: [MiscModule],
  controllers: [MiscController],
  providers: [MiscService],
})
export class MainModule {}
