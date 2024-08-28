import { Controller } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';
import { AppService } from './app.service';
import { TransactionCreatedEvent } from './events/transaction_created.event';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @EventPattern('transaction_created')
  handleTransactionCreated(data: TransactionCreatedEvent): Promise<any> {
    return this.appService.handleTransactionCreated(data);
  }
}
