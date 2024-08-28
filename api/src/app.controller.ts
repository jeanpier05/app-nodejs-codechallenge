import { Controller, Inject, OnModuleInit } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { AppService } from './app.service';

@Controller()
export class AppController implements OnModuleInit {
  constructor(
    private readonly appService: AppService,
    @Inject('TRANSACTION_SERVICE') private readonly clientKafka: ClientKafka,
  ) {}

  // @Post('transaction')
  // createTransaction(@Body() data: any): Observable<any> {
  //   return this.appService.createTransaction(data);
  // }

  onModuleInit() {
    this.clientKafka.subscribeToResponseOf('transaction_created');
  }
}
