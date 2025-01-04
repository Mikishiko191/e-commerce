import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { User } from './model/user.model';
import { Prisma } from '@prisma/client';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async createUser(username: string, email: string): Promise<User> {
    try {
      return await this.prisma.user.create({
        data: {
          username,
          email,
        },
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          // Unique constraint failed
          throw new Error(
            `A user with the username "${username}" already exists.`,
          );
        }
      }
      throw error;
    }
  }

  async deleteUser(id: number): Promise<User> {
    try {
      return await this.prisma.user.delete({
        where: { id: +id },
      });
    } catch (error) {
      throw new Error(`Failed to delete user with id "${id}".`);
    }
  }

  async updateUser(id: number, username: string, email: string): Promise<User> {
    try {
      return await this.prisma.user.update({
        where: { id: +id },
        data: {
          username,
          email,
        },
      });
    } catch (error) {
      throw new Error(`Failed to update user with id "${id}".`);
    }
  }

  async getUsers(): Promise<User[]> {
    return this.prisma.user.findMany();
  }

  async getUserById(id: number): Promise<User> {
    return this.prisma.user.findUnique({
      where: { id },
    });
  }
}
