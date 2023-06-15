import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Check the <a href="http://localhost:8080">API documentation</a> for a list of available endpoints';
  }
}
