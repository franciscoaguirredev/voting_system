import { NestFactory, Reflector } from '@nestjs/core';
import {Logger as logger, ValidationPipe} from '@nestjs/common';
import { AppModule } from './app.module';
import { JwtAuthGuard } from './auth/jwt-auth.guard';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,  
    forbidNonWhitelisted: true, 
    transform: true,
  }));

  const reflector = app.get(Reflector);
  app.useGlobalGuards(new JwtAuthGuard(reflector));


  await app.listen(process.env.PORT ?? 3000);
  logger.log('App running on port 3000')
}
bootstrap();
