import { Module } from '@nestjs/common';
import { VotingCasterService } from './voting-caster.service';
import { VotingCasterController } from './voting-caster.controller';
import { JwtStrategy } from 'src/authorization/JwtStrategy';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  controllers: [VotingCasterController],
  providers: [VotingCasterService, JwtStrategy],
  imports: [
    ClientsModule.register([
      {
        name: 'VOTE_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: [process.env.RABBITMQ_URL || 'amqp://rabbitmq:5672'],
          queue: process.env.RABBITMQ_QUEUE_NAME || 'vote_queue',
          queueOptions: { durable: true },
          exchange: process.env.RABBITMQ_EXCHANGE_NAME || 'events_exchange',
          exchangeType: 'topic',
        },
      },
    ]),
  ]
})
export class VotingCasterModule { }
