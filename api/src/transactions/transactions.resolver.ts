import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateTransactionInput } from './dto/input/create-transaction.input';

import { GetTransactionArgs } from './dto/args/get-transaction.args';
import { TransactionGQL } from './models/transaction.model';
import { TransactionsService } from './transactions.service';

@Resolver(() => TransactionGQL)
export class TransactionsResolver {
  constructor(private readonly transactionsService: TransactionsService) {}

  @Query(() => TransactionGQL, { name: 'transaction', nullable: true })
  getUsers(
    @Args() getTransactionArgs: GetTransactionArgs,
  ): Promise<TransactionGQL> {
    return this.transactionsService.getTransaction(getTransactionArgs);
  }

  @Mutation(() => TransactionGQL)
  createTransaction(
    @Args('createTransactionData')
    createTransactionData: CreateTransactionInput,
  ): Promise<TransactionGQL> {
    return this.transactionsService.createTransaction(createTransactionData);
  }
}
