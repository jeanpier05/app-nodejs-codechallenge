import { ArgsType, Field } from '@nestjs/graphql';
import { IsNotEmpty, IsUUID } from 'class-validator';

@ArgsType()
export class GetTransactionArgs {
  @Field()
  @IsUUID()
  @IsNotEmpty()
  transactionExternalId: string;
}
