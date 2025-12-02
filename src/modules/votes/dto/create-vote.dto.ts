import { IsNotEmpty, IsUUID } from 'class-validator';

export class CreateVoteDto {
  @IsNotEmpty()
  @IsUUID()
  voter_id: string;

  @IsNotEmpty()
  @IsUUID()
  candidate_id: string;
}
