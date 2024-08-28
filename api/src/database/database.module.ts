import { Global, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TransactionStatus } from '../entities/transaction-status.entity';
import { TransactionType } from '../entities/transaction-type.entity';
import { Transactions } from '../entities/transactions.entity';

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // Esto hace que el ConfigService esté disponible globalmente
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        return {
          type: 'postgres',
          host: configService.get<string>('DB_HOST'),
          port: configService.get<number>('DB_PORT'),
          username: configService.get<string>('DB_USERNAME'),
          password: configService.get<string>('DB_PASSWORD'),
          database: configService.get<string>('DB_DATABASE'),
          entities: [Transactions, TransactionType, TransactionStatus],
        };
      },
    }),
    TypeOrmModule.forFeature([Transactions]),
  ],
  providers: [],
  exports: [TypeOrmModule],
})
export class DatabaseModule {}
