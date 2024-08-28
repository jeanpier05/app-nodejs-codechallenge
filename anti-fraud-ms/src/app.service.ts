import { Inject, Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ClientKafka } from '@nestjs/microservices';
import { TransactionCreatedEvent } from './events/transaction_created.event';
import { TransactionStatusEnum } from './interfaces/transaction-status.enum';

@Injectable()
export class AppService {
  private readonly logger = new Logger(AppService.name);

  constructor(
    private configService: ConfigService,
    @Inject('TRANSACTION_SERVICE') private readonly clientKafka: ClientKafka,
  ) {}

  async handleTransactionCreated(
    transactionCreatedEvent: TransactionCreatedEvent,
  ): Promise<void> {
    this.logger.log('antifraud - message received', transactionCreatedEvent);

    // Determinar el estado de la transacción basado en el monto
    const status =
      transactionCreatedEvent.amount >
      this.configService.get<number>('TRANSACTION_VALUE_REJECTED')
        ? TransactionStatusEnum.REJECTED //'rejected'
        : TransactionStatusEnum.APPROVED; //'approved';

    // Emitir el evento con el estado de la transacción
    this.clientKafka
      .emit(
        'transaction_status',
        new TransactionCreatedEvent(
          transactionCreatedEvent.transactionExternalId,
          status,
          transactionCreatedEvent.amount,
        ).toString(),
      )
      .subscribe({
        next: () =>
          this.logger.log(
            `Send transaction ${transactionCreatedEvent.transactionExternalId} > Status ${status} event`,
          ),
        error: (err) =>
          this.logger.error('Error emitting transaction status:', err),
      });
  }
}
