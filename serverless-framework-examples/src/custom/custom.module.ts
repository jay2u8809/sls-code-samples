import { Module } from '@nestjs/common';
import { CustomController } from './custom.controller';
import { CustomService } from './custom.service';

@Module({
  imports: [],
  controllers: [CustomController],
  providers: [CustomService],
})
export class CustomModule { }
