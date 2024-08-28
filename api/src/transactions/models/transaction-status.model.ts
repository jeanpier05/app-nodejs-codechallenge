import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class TransactionStatusGQL {
  @Field()
  id: number;

  @Field()
  transactionStatusName: string;
}
