import { applyDecorators } from '@nestjs/common';
import { ApiBody } from '@nestjs/swagger';
import { CreateVoteDto } from 'src/modules/votes/dto/create-vote.dto';

export const ApiCreateVoteDocs = () =>
  applyDecorators(
    ApiBody({
      type: CreateVoteDto,
      examples: {
        default: {
          summary: 'Crear voto',
          value: {
            voter_id: '3f2a0e3d-4d83-4aa6-8b47-9e1e8a843b57',
            candidate_id: 'e9c3bcb9-7bc6-4ac1-8a93-5ea57eb7b63f',
          },
        },
      },
    }),
  );
