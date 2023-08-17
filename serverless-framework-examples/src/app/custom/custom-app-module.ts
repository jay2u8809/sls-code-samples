import { Module } from '@nestjs/common';
import {CustomModule} from "../../custom/custom.module";

@Module({
  imports: [CustomModule],
  providers: [],
  controllers: [],
  exports: [],
})
export class CustomAppModule {}
