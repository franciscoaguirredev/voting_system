import { HttpStatus } from '@nestjs/common';

export interface interfaceHandleResponse {
  data: any | {};
  message: string;
  statusCode: HttpStatus;
}