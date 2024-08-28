import { Inject, Injectable, Logger } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { Transactions } from '../entities/transactions.entity';
import { TransactionStatusEnum } from '../interfaces/transaction-status.enum';
import { GetTransactionArgs } from './dto/args/get-transaction.args';
import { CreateTransactionInput } from './dto/input/create-transaction.input';
import { TransactionCreatedEvent } from './events/transaction_created.event';
import { TransactionStatusGQL } from './models/transaction-status.model';
import { TransactionTypeGQL } from './models/transaction-type.model';
import { TransactionGQL } from './models/transaction.model';

@Injectable()
export class TransactionsService {
  private readonly logger = new Logger(TransactionsService.name);

  constructor(
    @Inject('TRANSACTION_SERVICE') private readonly clientKafka: ClientKafka,
    @InjectRepository(Transactions)
    private transactionRepo: Repository<Transactions>,
  ) {}

  public async getTransaction(
    getTransactionArgs: GetTransactionArgs,
  ): Promise<TransactionGQL> {
    this.logger.log('getTransaction....', getTransactionArgs);

    const trx = await this.transactionRepo.findOne({
      where: {
        transactionExternalId: getTransactionArgs.transactionExternalId,
      },
      relations: ['transactionType', 'transactionStatus'],
    });

    if (!trx) {
      throw new Error('Transaction not found');
    }

    console.log(trx);

    const {
      transactionType,
      amount,
      createdAt,
      transactionExternalId,
      transactionStatus,
    } = trx;

    return {
      transactionExternalId,
      transactionType,
      transactionStatus,
      value: amount,
      createdAt,
    };
  }

  public async createTransaction(
    createTransactionData: CreateTransactionInput,
  ): Promise<TransactionGQL> {
    const transaction: TransactionGQL = {
      transactionExternalId: uuidv4(),
      transactionType: {
        id: createTransactionData.tranferTypeId,
      } as TransactionTypeGQL,
      transactionStatus: {
        id: TransactionStatusEnum.PENDING,
      } as TransactionStatusGQL,
      value: createTransactionData.value,
      createdAt: new Date(),
    };

    this.logger.log('Save Transaction with pending Status', transaction);

    // Guardar la transacción en la base de datos usando TypeORM
    const savedTransaction = await this.transactionRepo.save({
      transactionExternalId: transaction.transactionExternalId,
      accountExternalIdDebit: createTransactionData.accountExternalIdDebit,
      accountExternalIdCredit: createTransactionData.accountExternalIdCredit,
      transactionType: { id: transaction.transactionType.id },
      transactionStatus: { id: transaction.transactionStatus.id },
      amount: transaction.value,
      createdAt: transaction.createdAt,
    } as Transactions);

    // Obtener la transación registrada en base de datos
    const trx = await this.transactionRepo.findOne({
      where: {
        transactionExternalId: transaction.transactionExternalId,
      },
      relations: ['transactionType', 'transactionStatus'],
    });

    // Emitir un evento Kafka indicando que la transacción fue creada
    this.clientKafka
      .emit(
        'transaction_created',
        new TransactionCreatedEvent(
          transaction.transactionExternalId,
          transaction.transactionStatus.id,
          transaction.value,
        ).toString(),
      )
      .subscribe({
        next: () => this.logger.log('Send transaction Created event'),
        error: (err) => this.logger.error('Error sending event:', err),
      });

    const {
      transactionType,
      amount,
      createdAt,
      transactionExternalId,
      transactionStatus,
    } = trx;

    return {
      transactionExternalId,
      transactionType,
      transactionStatus,
      value: amount,
      createdAt,
    };
  }
}
