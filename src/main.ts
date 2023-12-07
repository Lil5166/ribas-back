import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { HttpExceptionFilter, validationExceptionFactory } from './security/CommonExceptions';
import { ConfigService } from '@nestjs/config';

async function bootstrap () {
  const app = await NestFactory.create(AppModule);
  const configService = app.get<ConfigService>(ConfigService);
  app.enableCors();
  app.useGlobalFilters(new HttpExceptionFilter(configService));
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      exceptionFactory: validationExceptionFactory(),
    }));
  await app.listen(3010);
}
bootstrap();
