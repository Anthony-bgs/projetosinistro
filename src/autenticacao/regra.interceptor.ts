// roles.interceptor.ts
import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
  ForbiddenException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { ROLES_KEY } from './regra.decorator';

@Injectable()
export class RolesInterceptor implements NestInterceptor {
  constructor(private reflector: Reflector) { }

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const requiredRoles = this.reflector.getAllAndOverride<string[]>(
      ROLES_KEY,
      [context.getHandler(), context.getClass()],
    );

    if (!requiredRoles) return next.handle();

    const request = context.switchToHttp().getRequest();
    const user = request.user;
  
    if (!user || !requiredRoles.includes(user.perfil)) {
      throw new ForbiddenException('Acesso negado: perfil insuficiente');
    }
      return next.handle();
    }
  }

