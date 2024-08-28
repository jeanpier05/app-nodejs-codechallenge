import { Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  // Habilitar CORS para toda la aplicación, incluidas las rutas de GraphQL
  app.enableCors({
    origin: 'http://localhost:3000', // Configura según el dominio permitido
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: 'Content-Type, Accept',
  });

  const configService = app.get(ConfigService);
  const logger = new Logger('Api - graphql');

  const port = configService.get<number>('PORT');
  logger.log('Port', port);
  await app.listen(port);
}
bootstrap();
