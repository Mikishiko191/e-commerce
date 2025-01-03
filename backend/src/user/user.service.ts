import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async createUser(username: string, email: string) {
    return this.prisma.user.create({
      data: {
        username,
        email,
      },
    });
  }

  async getUsers() {
    return this.prisma.user.findMany();
  }
}
