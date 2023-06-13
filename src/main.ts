import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { RemovePasswordInterceptor } from './interceptor/removepasswordinterceptor.interceptor'

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalInterceptors(new RemovePasswordInterceptor())
  await app.listen(3000);
}
bootstrap();
