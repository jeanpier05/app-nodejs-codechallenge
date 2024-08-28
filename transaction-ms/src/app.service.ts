import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Transactions } from './entities/transactions.entity';
import { TransactionCreatedEvent } from './events/transaction_created.event';

@Injectable()
export class AppService {
  private readonly logger = new Logger(AppService.name);

  constructor(
    @InjectRepository(Transactions)
    private transactionRepo: Repository<Transactions>,
  ) {}

  async handleTransactionStatus(
    transactionCreatedEvent: TransactionCreatedEvent,
  ): Promise<any> {
    this.logger.log('transaction - message received', transactionCreatedEvent);

    try {
      // Realiza la actualización del estado de la transacción
      await this.transactionRepo.update(
        {
          transactionExternalId: transactionCreatedEvent.transactionExternalId,
        },
        {
          transactionStatus: {
            id: transactionCreatedEvent.transactionStatusId,
          },
        },
      );

      this.logger.log('Update transaction Status event');

      // Recupera la transacción actualizada si es necesario
      const updatedTransaction = await this.transactionRepo.findOne({
        where: {
          transactionExternalId: transactionCreatedEvent.transactionExternalId,
        },
      });

      return updatedTransaction;
    } catch (error) {
      this.logger.error('Error updating transaction status:', error);
      throw error;
    }
  }
}
