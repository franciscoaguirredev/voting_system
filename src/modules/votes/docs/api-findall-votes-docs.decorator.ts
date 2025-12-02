import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

export const ApiFindAllVotesDocs = () =>
  applyDecorators(
    ApiOperation({ summary: 'Obtener todos los votos' }),
    ApiResponse({ status: 200 }),
  );
