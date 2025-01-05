import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-custom';
import { AuthService } from '../auth.service';

@Injectable()
export class MagicStrategy extends PassportStrategy(Strategy, 'magic') {
  constructor(private authService: AuthService) {
    super();
  }

  async validate(req: Request): Promise<any> {
    const token = req.headers['x-magic-token'] as string;
    if (!token) {
      throw new UnauthorizedException('Magic token missing');
    }
    const user = await this.authService.validateMagicToken(token);
    if (!user) {
      throw new UnauthorizedException('Invalid magic token');
    }
    return user;
  }
}
