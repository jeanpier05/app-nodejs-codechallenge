import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const logger = new Logger('AntiFraud- KafkaMicroservice');

  const kafkaBrokers = configService.get<string>('KAFKA_BROKERS').split(',');

  logger.log('Kafka Brokers:', configService.get<string>('KAFKA_BROKERS'));

  const kafkaOptions: MicroserviceOptions = {
    transport: Transport.KAFKA,
    options: {
      client: {
        brokers: kafkaBrokers,
      },
      consumer: {
        groupId: configService.get<string>('KAFKA_GROUP_ID'),
      },
    },
  };

  const microservice =
    await NestFactory.createMicroservice<MicroserviceOptions>(
      AppModule,
      kafkaOptions,
    );

  microservice.listen();
  logger.log('AntiFraud- Kafka microservice is listening');
}

bootstrap();
