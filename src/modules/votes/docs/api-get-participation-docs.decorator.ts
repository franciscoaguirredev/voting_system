import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

export const ApiGetParticipationDocs = () =>
  applyDecorators(
    ApiOperation({ summary: 'Obtener porcentaje de participación' }),
    ApiResponse({ status: 200 }),
  );
