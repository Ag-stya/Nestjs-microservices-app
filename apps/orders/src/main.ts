import { NestFactory } from '@nestjs/core';
import { OrdersModule } from './orders.module';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(OrdersModule);
  app.useGlobalPipes(new ValidationPipe());

  const configService = app.get(ConfigService);
  const port = configService.get<number>('PORT') || 3000;

  await app.listen(port);
}
bootstrap();

