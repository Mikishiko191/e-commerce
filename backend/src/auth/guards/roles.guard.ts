import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from '../decorators/roles.decorator';
import { User } from '@prisma/client';
import { Role } from '../enums/roles.enum';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!requiredRoles) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const user: User = request.user?.data?.[0];

    console.log('Required Roles:', requiredRoles);
    console.log('User Role:', user.role);

    if (!user || !user.role) {
      throw new ForbiddenException('User role not found.');
    }

    if (!requiredRoles.includes(user.role as Role)) {
      throw new ForbiddenException(
        `You need one of the following roles: ${requiredRoles.join(', ')}`,
      );
    }

    return true;
  }
}
