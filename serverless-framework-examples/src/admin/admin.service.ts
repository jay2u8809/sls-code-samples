import { Injectable, Logger } from '@nestjs/common';

const TAG = 'AdminService';

@Injectable()
export class AdminService {
  private readonly logger = new Logger(AdminService.name);

  constructor() {}

  async getTest(param: any): Promise<string> {
    this.logger.log(TAG);
    return `get-test-${JSON.stringify(param)}`;
  }
}
