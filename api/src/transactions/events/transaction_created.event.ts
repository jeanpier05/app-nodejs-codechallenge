import { IsEnum, IsNotEmpty, IsNumber, IsUUID } from 'class-validator';
import { TransactionStatusEnum } from 'src/interfaces/transaction-status.enum';

export class TransactionCreatedEvent {
  @IsUUID()
  @IsNotEmpty()
  public readonly transactionExternalId: string;

  @IsNotEmpty()
  @IsNumber()
  @IsEnum(TransactionStatusEnum)
  transactionStatusId: number;

  @IsNumber()
  @IsNotEmpty()
  public readonly amount: number;

  constructor(
    transactionExternalId: string,
    transactionStatusId: number,
    amount: number,
  ) {
    this.transactionExternalId = transactionExternalId;
    this.transactionStatusId = transactionStatusId;
    this.amount = amount;
  }

  toString() {
    return JSON.stringify({
      transactionExternalId: this.transactionExternalId,
      transactionStatusId: this.transactionStatusId,
      amount: this.amount,
    });
  }
}
