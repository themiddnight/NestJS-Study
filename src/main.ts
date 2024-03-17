import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

const port = 3000;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const options = new DocumentBuilder()
    .setTitle('NestJS API Stydy')
    .setDescription(`This is a study project for NestJS na ja.`)
    .setVersion('1.0')
    .addTag('Categories')
    .addTag('Products')
    .addTag('Reviews')
    .build();

  app.setGlobalPrefix('api');
  app.enableCors();
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    }),
  );

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);

  await app.listen(port);
  console.log(`Server is running on port 3000`);
}

bootstrap();
