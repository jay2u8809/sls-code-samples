import { Injectable } from '@nestjs/common';

@Injectable()
export class CustomService {
  async fetchImage(param: {
    type: string;
    size: string;
    key: string;
  }): Promise<any> {
    return '';
  }
}
