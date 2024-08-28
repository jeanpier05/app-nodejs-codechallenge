import { Inject, Injectable } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';

@Injectable()
export class AppService {
  constructor(
    @Inject('TRANSACTION_SERVICE') private readonly clientKafka: ClientKafka,
  ) {}
}
