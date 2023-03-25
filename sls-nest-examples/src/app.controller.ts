import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

const TAG = 'AppController';

@Controller('/app')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/hello')
  getHello(): string {
    console.log(TAG, 'get-hello');
    return this.appService.getHello();
  }
}
