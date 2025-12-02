import { applyDecorators } from '@nestjs/common';
import {
  ApiOperation,
  ApiOkResponse,
  ApiParam,
  ApiNotFoundResponse,
  ApiUnauthorizedResponse,
  ApiInternalServerErrorResponse,
} from '@nestjs/swagger';

export function ApiFindOneVoter() {
  return applyDecorators(
    ApiOperation({ summary: 'Obtener un votante por ID' }),

    ApiParam({
      name: 'id',
      type: String,
      description: 'UUID del votante',
      example: 'd92af9b8-60ba-49e8-b2df-d7f985caeddf',
    }),

    ApiOkResponse({
      description: 'Votante encontrado',
      schema: {
        example: {
          id: 'd92af9b8-60ba-49e8-b2df-d7f985caeddf',
          name: 'Carlos Lopez',
          email: 'carlos@example.com',
          createdAt: '2025-01-01T10:00:00.000Z',
        },
      },
    }),

    ApiNotFoundResponse({
      description: 'El votante no existe',
    }),

    ApiUnauthorizedResponse({
      description: 'Token inválido o no enviado',
    }),

    ApiInternalServerErrorResponse({
      description: 'Error inesperado del servidor',
    }),
  );
}
