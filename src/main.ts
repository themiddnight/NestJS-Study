import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

const base_url = process.env.BASE_URL;
const port = process.env.PORT;
const api_path = process.env.API_PATH;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const options = new DocumentBuilder()
    .setTitle('NestJS API Stydy')
    .setDescription(`This is a study project for NestJS na ja.`)
    .setVersion('1.0')
    .addTag('Categories')
    .addTag('Products')
    .build();

  app.setGlobalPrefix(api_path);
  app.enableCors();
  app.useGlobalPipes(new ValidationPipe());

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);

  await app.listen(port);
  console.log(`API started on: ${base_url}/${api_path}`);
}

bootstrap();
