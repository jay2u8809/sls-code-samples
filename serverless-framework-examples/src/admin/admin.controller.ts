import { Controller, Get, Logger, Param } from '@nestjs/common';
import { AdminService } from './admin.service';

const PATH = '/api/admin/v1';

@Controller(PATH)
export class AdminController {
  private readonly logger = new Logger(AdminController.name);

  constructor(private readonly service: AdminService) {}

  @Get('/test/:param')
  public async getTest(@Param() param: any): Promise<string> {
    this.logger.log(JSON.stringify(param));
    return this.service.getTest(param);
  }
}
