import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { writeFileSync } from 'fs';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Voting app Api')
    .setDescription('Voting app Api')
    .setVersion('1.0')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);

  writeFileSync("./swagger-spec.json", JSON.stringify(documentFactory()));

  SwaggerModule.setup('api', app, documentFactory);

  await app.listen(process.env.GATEWAY_PORT ?? 3000);
}
bootstrap();
