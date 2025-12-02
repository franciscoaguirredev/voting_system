import { applyDecorators } from '@nestjs/common';
import {
  ApiOperation,
  ApiOkResponse,
  ApiUnauthorizedResponse,
  ApiInternalServerErrorResponse,
} from '@nestjs/swagger';

export function ApiFindAllVoters() {
  return applyDecorators(
    ApiOperation({ summary: 'Listar todos los votantes' }),

    ApiOkResponse({
      description: 'Lista de votantes obtenida correctamente',
      schema: {
        example: [
          {
            id: 'd92af9b8-60ba-49e8-b2df-d7f985caeddf',
            name: 'Carlos Lopez',
            email: 'carlos@example.com',
          },
          {
            id: '71fa5e42-dbd9-43e1-9498-a2536bf5e68b',
            name: 'Ana Torres',
            email: 'ana@example.com',
          },
        ],
      },
    }),

    ApiUnauthorizedResponse({
      description: 'No autorizado — falta token o es inválido',
    }),

    ApiInternalServerErrorResponse({
      description: 'Error inesperado del servidor',
    }),
  );
}
