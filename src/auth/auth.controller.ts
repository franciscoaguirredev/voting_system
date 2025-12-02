import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { loginVoterDto } from './dto/login.dto';
import { Public } from './decorators/public.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('validate-token')
  validateToken(@Query('token') token: string) {
    if (!token) {
      throw new UnauthorizedException('The token is required');
    }
    const payload = this.authService.validateToken(token);
    return { valid: true, payload };
  }

  @Public()
  @Post('login')
  loginUser(@Body() loginUserDto: loginVoterDto) {
    return this.authService.login(loginUserDto);
  }
}
