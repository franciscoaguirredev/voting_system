import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export function setupSwagger(app: INestApplication) {
  const config = new DocumentBuilder()
    .setTitle('Sistema de Votación API')
    .setDescription(
      'API REST para un sistema de votación electrónica. Permite registro de votantes, candidatos y emisión de votos.'
    )
    .setVersion('1.0')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'JWT',
        in: 'header',
        description: 'Token JWT',
      },
      'JWT-auth'
    )
    .addTag('Auth')
    .addTag('Voters')
    .addTag('Candidates')
    .addTag('Votes')
    .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('api/docs', app, document, {
    swaggerOptions: {
      persistAuthorization: true,
      docExpansion: 'none',
      filter: true,
    },
    customSiteTitle: 'Sistema de Votación - API Docs',
  });
}