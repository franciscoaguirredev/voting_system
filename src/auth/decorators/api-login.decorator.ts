import { applyDecorators } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
} from '@nestjs/swagger';
import { loginVoterDto } from '../../auth/dto/login.dto';

export const ApiLoginDocs = () =>
  applyDecorators(
    ApiBody({
      type: loginVoterDto,
      examples: {
        default: {
          summary: 'Ejemplo de login',
          value: {
            email: 'admin@mail.com',
            password: '123456',
          },
        },
      },
    }),

    ApiCreatedResponse({
      description: 'Login correcto',
      schema: {
        example: {
          id: 'f4c3beb7-b800-4ab5-9003-855e1bc60c08',
          name: 'Juan Pérez',
          email: 'juansdhh@example.com',
          token:
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiSnVhbiBQw6lyZXoiLCJlbWFpbCI6Imp1YW5zZGhoQGV4YW1wbGUuY29tIiwiaWQiOiJmNGMzYmViNy1iODAwLTRhYjUtOTAwMy04NTVlMWJjNjBjMDgiLCJpYXQiOjE3NjQ2NjM3NTIsImV4cCI6MTc2NDc1MDE1Mn0.dibUGzILpRUzYBpgFqGH_NbdYpMeFw5dAHErSxnZaXQ',
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
