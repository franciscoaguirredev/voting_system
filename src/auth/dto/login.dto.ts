import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class loginVoterDto {
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;
}