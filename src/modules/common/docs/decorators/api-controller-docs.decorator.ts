import {
  applyDecorators,
  Controller,
  SetMetadata,
} from '@nestjs/common';
import {
  ApiTags,
  ApiBearerAuth,
  ApiSecurity,
  ApiHeader,
  ApiExtraModels,
  ApiResponse,
} from '@nestjs/swagger';
import { DECORATORS } from '@nestjs/swagger/dist/constants';


function applyGlobalEndpointDocs() {
  return applyDecorators(
    ApiResponse({ status: 200, description: 'Successful response' }),
    ApiResponse({ status: 201, description: 'Created successfully' }),
    ApiResponse({ status: 400, description: 'Bad request' }),
    ApiResponse({ status: 401, description: 'Unauthorized' }),
    ApiResponse({ status: 403, description: 'Forbidden' }),
    ApiResponse({ status: 404, description: 'Not found' }),
    ApiResponse({ status: 500, description: 'Internal server error' }),
  );
}

export function ApiControllerDocs(tag: string) {
  return applyDecorators(
    ApiTags(tag),
    ApiBearerAuth('JWT-auth'),
    ApiSecurity('JWT-auth'),
    ApiHeader({
      name: 'Authorization',
      description: 'Token JWT',
      required: false,
    }),
    ApiExtraModels(),

    SetMetadata(DECORATORS.API_OPERATION, { summary: `${tag} Controller` }),
    applyGlobalEndpointDocs(),
  );
}
