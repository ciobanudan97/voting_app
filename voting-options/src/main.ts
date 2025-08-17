import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
    transport: Transport.TCP,
    options: {
      host: process.env.DOCKER_SERVICES_HOST || '0.0.0.0.',
      port: parseInt(process.env.VOTING_OPTIONS_PORT || "4003") // Ensure the port is set from environment variable or default to 4003,
    }
  });
  await app.listen();
}
bootstrap();
