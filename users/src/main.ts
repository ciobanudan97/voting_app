import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
    transport: Transport.TCP,
    options: {
      host: process.env.DOCKER_SERVICES_HOST || '0.0.0.0.',
      port: parseInt(process.env.USERS_PORT || "4001") // Ensure the port is set from environment variable or default to 4001,
    }
  });
  await app.listen();

  console.log('Users microservice is running on port 4001');
}
bootstrap();
