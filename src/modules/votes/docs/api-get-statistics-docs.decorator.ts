import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

export const ApiGetStatisticsDocs = () =>
  applyDecorators(
    ApiOperation({ summary: 'Obtener estadísticas de votación' }),
    ApiResponse({ status: 200 }),
  );
