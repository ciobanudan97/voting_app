import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.createMicroservice(AppModule, {
    transport: Transport.RMQ,
    options: {
      urls: ['amqp://rabbitmq:5672'],
      queue: 'vote_queue',
      queueOptions: { durable: true },
      routingKey: '#', // ✅ wildcard match for all events
      exchange: 'events_exchange',
      exchangeType: 'topic',
    },
  });
  await app.listen();

}
bootstrap();
