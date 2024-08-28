import { Field, InputType } from '@nestjs/graphql';
import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsUUID,
} from 'class-validator';
import { TransactionTypeEnum } from '../../../interfaces/transaction-type.enum';

@InputType()
export class CreateTransactionInput {
  @Field()
  @IsUUID()
  @IsNotEmpty()
  accountExternalIdDebit: string;

  @Field()
  @IsUUID()
  @IsNotEmpty()
  accountExternalIdCredit: string;

  @Field()
  @IsNotEmpty()
  @IsNumber()
  @IsEnum(TransactionTypeEnum)
  tranferTypeId: number;

  @Field()
  @IsNotEmpty()
  @IsPositive()
  value: number;
}
