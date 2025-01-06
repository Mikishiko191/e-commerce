import { Controller, Post, Body, UseGuards, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { MagicAuthGuard } from './guards/magic.guard';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  async register(@Body() createUserDto: CreateUserDto) {
    try {
      const user = await this.authService.register(createUserDto);
      return user;
    } catch (error) {
      // Re-throw the error to be handled globally or here
      throw error;
    }
  }

  @Post('login')
  login(@Body() loginDto: LoginDto) {
    const { email, password } = loginDto;
    return this.authService.login(email, password);
  }

  @Post('magic-link')
  sendMagicLink(@Body() body: { email: string }) {
    return this.authService.sendMagicLink(body.email);
  }

  @UseGuards(MagicAuthGuard)
  @Post('magic-protected')
  magicProtectedRoute(@Request() req) {
    return { message: 'This is a magic protected route', user: req.user };
  }
}
