import { applyDecorators } from '@nestjs/common';
import {
  ApiOperation,
  ApiCreatedResponse,
  ApiBadRequestResponse,
  ApiInternalServerErrorResponse,
  ApiBody,
} from '@nestjs/swagger';
import { CreateVoterDto } from '../dto/create-voter.dto';

export function ApiCreateVoter() {
  return applyDecorators(
    ApiOperation({ summary: 'Crear un nuevo votante (público)' }),

ApiBody({
      type: CreateVoterDto,
      examples: {
        default: {
          summary: 'Ejemplo de creación de un votante',
          value: {
            name: "Juan Pérez",
            email: "juan.perez@example.com",
            password: 'Abc*123456*'

          }
        }
      }
    }),

    ApiCreatedResponse({
      description: 'Votante creado correctamente',
      schema: {
        example: {
          id: 'a31b550c-9223-47f0-bc21-f7badb1c91fb',
          name: 'Carlos Lopez',
          email: 'carlos@example.com',
        },
      },
    }),

    ApiBadRequestResponse({
      description: 'Datos inválidos. Ej: email incorrecto o password débil.',
    }),

    ApiInternalServerErrorResponse({
      description: 'Error inesperado en el servidor',
    }),


  );
}
