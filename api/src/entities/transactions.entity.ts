import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
} from 'typeorm';
import { TransactionStatus } from './transaction-status.entity';
import { TransactionType } from './transaction-type.entity';

@Entity('transactions')
export class Transactions {
  @PrimaryColumn({ type: 'varchar', length: 36 })
  transactionExternalId: string;

  @Column({ type: 'varchar', length: 36 })
  accountExternalIdDebit: string;

  @Column({ type: 'varchar', length: 36 })
  accountExternalIdCredit: string;

  @ManyToOne(() => TransactionType, (transactionType) => transactionType.id)
  @JoinColumn({ name: 'transactionTypeId' })
  transactionType: TransactionType;

  @ManyToOne(
    () => TransactionStatus,
    (transactionStatus) => transactionStatus.id,
  )
  @JoinColumn({ name: 'transactionStatusId' })
  transactionStatus: TransactionStatus;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  amount: number;

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;
}
