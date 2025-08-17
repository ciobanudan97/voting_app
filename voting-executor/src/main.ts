import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.createMicroservice(AppModule, {
    transport: Transport.RMQ,
    options: {
      urls: [process.env.RMQ_URL || 'amqp://rabbitmq:5672'],
      queue: process.env.RMQ_QUEUE || 'vote_queue',
      queueOptions: { durable: true },
      routingKey: '#', // ✅ wildcard match for all events
      exchange: process.env.RMQ_EXCHANGE || 'events_exchange',
      exchangeType: 'topic',
    },
  });
  await app.listen();

}
bootstrap();
