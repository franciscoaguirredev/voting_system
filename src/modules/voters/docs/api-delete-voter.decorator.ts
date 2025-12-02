import { applyDecorators } from '@nestjs/common';
import {
  ApiOperation,
  ApiOkResponse,
  ApiParam,
  ApiNotFoundResponse,
  ApiUnauthorizedResponse,
  ApiInternalServerErrorResponse,
} from '@nestjs/swagger';

export function ApiDeleteVoter() {
  return applyDecorators(
    ApiOperation({ summary: 'Eliminar un votante por ID' }),

    ApiParam({
      name: 'id',
      type: String,
      description: 'UUID del votante',
      example: '71fa5e42-dbd9-43e1-9498-a2536bf5e68b',
    }),

    ApiOkResponse({
      description: 'Votante eliminado correctamente',
      schema: {
        example: {
          message: 'Votante eliminado exitosamente',
        },
      },
    }),

    ApiNotFoundResponse({
      description: 'No existe un votante con ese ID',
    }),

    ApiUnauthorizedResponse({
      description: 'No autorizado',
    }),

    ApiInternalServerErrorResponse({
      description: 'Error inesperado del servidor',
    }),
  );
}
