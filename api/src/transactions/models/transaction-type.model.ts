import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class TransactionTypeGQL {
  @Field()
  id: number;

  @Field()
  transactionTypeName: string;
}
