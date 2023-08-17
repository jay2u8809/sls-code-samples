import { Controller, Get, Logger } from '@nestjs/common';
import { MiscService } from './misc.service';
import AppConfig from '../common/config/config';

const TAG = 'MiscController';

const PATH = `/api/misc/${AppConfig.ApiVersion}`;

@Controller(PATH)
export class MiscController {
  private readonly logger = new Logger(MiscController.name);

  constructor(private readonly service: MiscService) {}

  @Get('/utc/:random')
  public fetchCurrentUtc(): string {
    this.logger.log('f-current-time');
    return this.service.fetchCurrentTime();
  }
}
