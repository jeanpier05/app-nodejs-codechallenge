import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('transactionstatus')
export class TransactionStatus {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', nullable: true })
  transactionStatusName: string;
}
