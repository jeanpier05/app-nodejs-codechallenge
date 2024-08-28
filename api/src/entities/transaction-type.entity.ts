import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('transactiontype')
export class TransactionType {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', nullable: true })
  transactionTypeName: string;
}
