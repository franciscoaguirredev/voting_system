import {
  IsEmail,
  IsNotEmpty,
  IsString,
  IsStrongPassword,
  Matches,
  MinLength,
} from 'class-validator';

export class CreateVoterDto {
  @IsString()
  @MinLength(3, { message: 'Name must have at least 3 characters' })
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsEmail({}, { message: 'Please enter a valid email address' })
  @IsNotEmpty()
  email: string;

  @IsString()
  @MinLength(8, { message: 'Password must have at least 8 characters' })
  @IsNotEmpty()
  @IsStrongPassword()
  @Matches(/(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message:
      'Password must include at least one uppercase letter, one lowercase letter, and one number or special character.',
  })
  password: string;
}