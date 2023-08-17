import { Module } from '@nestjs/common';
import { MiscController } from './misc.controller';
import { MiscService } from './misc.service';

@Module({
  imports: [],
  providers: [MiscService],
  controllers: [MiscController],
  exports: [MiscService],
})
export class MiscModule {}
