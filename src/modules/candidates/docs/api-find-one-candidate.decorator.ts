import { applyDecorators } from '@nestjs/common';
import {
  ApiOperation,
  ApiOkResponse,
  ApiNotFoundResponse,
  ApiUnauthorizedResponse,
  ApiInternalServerErrorResponse,
  ApiParam,
} from '@nestjs/swagger';

export function ApiFindOneCandidate() {
  return applyDecorators(
    ApiOperation({ summary: 'Obtener un candidato por ID' }),

    ApiParam({
      name: 'id',
      type: String,
      description: 'ID del candidato',
    }),

    ApiOkResponse({
      description: 'Candidato encontrado',
      schema: {
        example: {
          id: 'a812bbcd-2ad3-4cb1-99d8-892ce8fa1b99',
          name: 'Juan Pérez',
          email: 'juan@example.com',
        },
      },
    }),

    ApiNotFoundResponse({
      description: 'El candidato no existe',
    }),

    ApiUnauthorizedResponse({
      description: 'No autorizado',
    }),

    ApiInternalServerErrorResponse({
      description: 'Error inesperado del servidor',
    }),
  );
}

