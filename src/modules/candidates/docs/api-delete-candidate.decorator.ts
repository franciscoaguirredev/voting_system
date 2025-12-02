import { applyDecorators } from '@nestjs/common';
import {
  ApiOperation,
  ApiOkResponse,
  ApiNotFoundResponse,
  ApiUnauthorizedResponse,
  ApiInternalServerErrorResponse,
  ApiParam,
} from '@nestjs/swagger';

export function ApiDeleteCandidate() {
  return applyDecorators(
    ApiOperation({ summary: 'Eliminar un candidato por ID' }),

    ApiParam({
      name: 'id',
      type: String,
      description: 'ID del candidato',
    }),

    ApiOkResponse({
      description: 'Candidato eliminado correctamente',
      schema: {
        example: {
          message: 'Candidato eliminado exitosamente',
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
