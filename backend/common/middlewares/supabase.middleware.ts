import { Injectable, NestMiddleware, ForbiddenException } from '@nestjs/common';
import { SupabaseService } from '../../src/supabase.service'; // Adjust import based on the actual location
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class SupabaseMiddleware implements NestMiddleware {
  constructor(private readonly supabaseService: SupabaseService) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const user = await this.supabaseService.getData(); // Get user data from Supabase
    req.user = user;

    next();
  }
}
