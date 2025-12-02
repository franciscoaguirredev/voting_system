import { Body, Controller, Post,} from '@nestjs/common';
import { AuthService } from './auth.service';
import { loginVoterDto } from './dto/login.dto';
import { Public } from './decorators/public.decorator';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiParam, ApiBody } from '@nestjs/swagger';
import { ApiLoginDocs } from './decorators/api-login.decorator';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @ApiLoginDocs()
  @Post('login')
  loginUser(@Body() loginUserDto: loginVoterDto) {
    return this.authService.login(loginUserDto);
  }
}
