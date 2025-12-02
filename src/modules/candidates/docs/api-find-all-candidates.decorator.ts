import { applyDecorators } from '@nestjs/common';
import {
  ApiOperation,
  ApiOkResponse,
  ApiUnauthorizedResponse,
  ApiInternalServerErrorResponse,
} from '@nestjs/swagger';

export function ApiFindAllCandidates() {
  return applyDecorators(
    ApiOperation({ summary: 'Listar todos los candidatos' }),

    ApiOkResponse({
      description: 'Lista de candidatos',
      schema: {
        example: [
          {
            id: 'a812bbcd-2ad3-4cb1-99d8-892ce8fa1b99',
            name: 'Juan Pérez',
            email: 'juan@example.com',
          },
        ],
      },
    }),

    ApiUnauthorizedResponse({
      description: 'No autorizado',
    }),

    ApiInternalServerErrorResponse({
      description: 'Error inesperado del servidor',
    }),
  );
}
