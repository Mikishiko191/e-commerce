import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { JwtService } from '@nestjs/jwt';
import { createClient } from '@supabase/supabase-js';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

@Injectable()
export class AuthService {
  private supabase;
  private readonly logger = new Logger(AuthService.name);

  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {
    this.supabase = createClient(
      process.env.SUPABASE_URL,
      process.env.SUPABASE_ANON_KEY,
    );
  }

  async register(createUserDto: CreateUserDto) {
    const { email, password, username } = createUserDto;

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    try {
      // Attempt to create the user
      const user = await this.prisma.user.create({
        data: {
          email,
          username,
          password: hashedPassword,
        },
        select: {
          id: true,
          username: true,
          email: true,
          apiKey: true,
          createdAt: true,
          updatedAt: true,
        },
      });

      return user;
    } catch (error) {
      if (
        error instanceof PrismaClientKnownRequestError &&
        error.code === 'P2002'
      ) {
        const failedField = Array.isArray(error.meta.target)
          ? error.meta.target[0]
          : error.meta.target;

        if (failedField === 'email') {
          throw new ConflictException('Email is already in use.');
        } else if (failedField === 'username') {
          throw new ConflictException('Username is already in use.');
        } else {
          throw new ConflictException('Unique constraint failed.');
        }
      }
      // Handle other potential errors
      throw new InternalServerErrorException('An unexpected error occurred.');
    }
  }

  async login(email: string, password: string) {
    const user = await this.prisma.user.findUnique({ where: { email } });
    if (
      user &&
      user.password &&
      (await bcrypt.compare(password, user.password))
    ) {
      const payload = { sub: user.id };
      return {
        access_token: this.jwtService.sign(payload),
      };
    }
    throw new UnauthorizedException('Invalid credentials');
  }

  //   async sendMagicLink(email: string) {
  //     const { error } = await this.supabase.auth.api.inviteUserByEmail(email, {
  //       redirectTo: process.env.MAGIC_REDIRECT_URL, // Ensure this env variable is set
  //     });
  //     if (error) {
  //       throw new UnauthorizedException('Failed to send magic link');
  //     }
  //     return { message: 'Magic link sent successfully' };
  //   }

  async sendMagicLink(email: string) {
    try {
      const { error } = await this.supabase.auth.signInWithOtp({
        email,
        options: {
          emailRedirectTo: process.env.MAGIC_REDIRECT_URL,
        },
      });

      if (error) {
        this.logger.error(`Supabase sendMagicLink Error: ${error.message}`);
        throw new ConflictException('Failed to send magic link.');
      }

      return { message: 'Magic link sent successfully.' };
    } catch (error) {
      this.logger.error(`sendMagicLink Exception: ${error.message}`);
      throw new InternalServerErrorException('Internal server error.');
    }
  }

  async validateMagicToken(token: string) {
    const { data: userData, error } = await this.supabase.auth.getUser(token);
    if (error || !userData.user) {
      return null;
    }
    return this.prisma.user.findUnique({ where: { id: userData.user.id } });
  }

  async validateApiKey(apiKey: string) {
    const user = await this.prisma.user.findUnique({
      where: { apiKey },
    });
    if (!user) {
      return null;
    }
    return user;
  }
}
