import { Controller, Post, Body, Get, UseGuards, Req } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private auth: AuthService) {}

  @Post('register')
  @ApiOperation({ summary: 'Register admin baru (open untuk belajar)' })
  register(@Body() dto: RegisterDto) {
    return this.auth.register(dto.email, dto.password, dto.name);
  }

  @Post('login')
  @ApiOperation({ summary: 'Login, return JWT' })
  login(@Body() dto: LoginDto) {
    return this.auth.login(dto.email, dto.password);
  }

  @UseGuards(JwtAuthGuard)
  @Get('me')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get current user (butuh JWT)' })
  me(@Req() req: any) {
    return req.user;
  }
}
