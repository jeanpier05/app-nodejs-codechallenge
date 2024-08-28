import { Field, Float, ObjectType } from '@nestjs/graphql';
import { TransactionStatusGQL } from './transaction-status.model';
import { TransactionTypeGQL } from './transaction-type.model';

@ObjectType()
export class TransactionGQL {
  @Field()
  transactionExternalId: string;

  @Field(() => TransactionTypeGQL)
  transactionType: TransactionTypeGQL;

  @Field(() => TransactionStatusGQL)
  transactionStatus: TransactionStatusGQL;

  @Field(() => Float)
  value: number;

  @Field()
  createdAt: Date;
}
