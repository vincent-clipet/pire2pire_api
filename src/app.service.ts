import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Check the API documentation for a list of available endpoints';
  }
}
