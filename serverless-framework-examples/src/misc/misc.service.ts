import { Injectable, Logger } from '@nestjs/common';
import * as dayjs from 'dayjs';

@Injectable()
export class MiscService {
  private readonly logger = new Logger(MiscService.name);

  fetchCurrentTime(code?: string): string {
    this.logger.log('f-current-time', code);
    return dayjs().toISOString();
  }
}
