import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as cookieParser from 'cookie-parser';

async function start() {
  try {
    const config = new DocumentBuilder()
      .setTitle('E-LIBRARY Project')
      .setDescription('Mini project for E-LIBRARY')
      .setVersion('1.0.0')
      .addTag('NodeJs, NestJs, Postgres, Sequelize, JWT, OTP, Swagger')
      .build();

    const PORT = process.env.PORT || 3003;
    const app = await NestFactory.create(AppModule);
    app.setGlobalPrefix('api');

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('/api/docs', app, document);
    app.use(cookieParser());
    app.useGlobalPipes(new ValidationPipe());

    await app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Error starting the server:', error);
  }
}

start();
