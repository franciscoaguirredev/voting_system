import { NestFactory } from '@nestjs/core';
import {Logger as logger, ValidationPipe} from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,  
    forbidNonWhitelisted: true, 
    transform: true,
  }));


  await app.listen(process.env.PORT ?? 3000);
  logger.log('App running on port 3000')
}
bootstrap();
