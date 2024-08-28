import { BadRequestException, Controller } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';
import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';
import { AppService } from './app.service';
import { TransactionCreatedEvent } from './events/transaction_created.event';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @EventPattern('transaction_status')
  async handleTransactionStatus(data: any): Promise<any> {
    const transactionEvent = plainToClass(TransactionCreatedEvent, data);

    const errors = await validate(transactionEvent);
    if (errors.length > 0) {
      throw new BadRequestException(
        'Invalid transaction data',
        errors.toString(),
      );
    }

    return this.appService.handleTransactionStatus(transactionEvent);
  }
}
