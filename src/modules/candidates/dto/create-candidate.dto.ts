import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsStrongPassword,
  Matches,
  MinLength,
} from 'class-validator';

export class CreateCandidateDto {
  @IsString()
  @MinLength(3, { message: 'Name must have at least 3 characters' })
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsOptional()
  party: string;
}
