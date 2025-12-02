import {
  applyDecorators,
} from '@nestjs/common';
import {
  ApiOperation,
  ApiCreatedResponse,
  ApiBadRequestResponse,
  ApiUnauthorizedResponse,
  ApiInternalServerErrorResponse,
  ApiBody,
} from '@nestjs/swagger';
import { CreateCandidateDto } from '../dto/create-candidate.dto';

export function ApiCreateCandidate() {
  return applyDecorators(
    ApiOperation({ summary: 'Crear un candidato' }),

    ApiBody({
      description: 'Datos para crear un candidato',
      schema: {
        example: {
          name: 'Daniel Quintero',
          party: 'Conservador',
        },
      },
    }),

    ApiCreatedResponse({
      description: 'Candidato creado correctamente',
      schema: {
        example: {
        name: "Federico Gutierrez",
        party: "Partido de la Derecha",
        id: "219ead76-3651-4340-9a7d-ad9ee48bcbd0"
        },
      },
    }),

    ApiBadRequestResponse({
      description: 'Datos inválidos enviados',
    }),

    ApiUnauthorizedResponse({
      description: 'No autorizado',
    }),

    ApiInternalServerErrorResponse({
      description: 'Error inesperado del servidor',
    }),
  );
}
