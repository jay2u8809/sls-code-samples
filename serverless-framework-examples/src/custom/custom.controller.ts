import {
  Controller,
  Get,
  Header,
  HttpCode,
  HttpStatus,
  Param,
  Res,
} from '@nestjs/common';
import { CustomService } from './custom.service';

const TAG = 'CustomController';

@Controller('/api/custom/v1')
export class CustomController {
  constructor(private readonly custom: CustomService) {}

  @Get('image/:type/:size/:key')
  @HttpCode(HttpStatus.OK)
  @Header('Cache-Control', 'max-age=30,s-maxage=60')
  async fetchImage(
    @Param() param: { type: string; size: string; key: string },
    @Res() response,
  ): Promise<void> {
    console.log(TAG, 'req', param);
    const result: any = await this.custom.fetchImage(param);
    console.log(TAG, 'res', result);
    response.type('image/png').end(result.Body, 'binary');
  }
}
