/**
 * Implementa el Guard de los roles, dandole acceso sólo a las personas que tengan ese rol
 */
import { Injectable, CanActivate, ExecutionContext} from '@nestjs/common';
import { Observable } from 'rxjs';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.get<string[]>('roles', context.getHandler());
    if (!roles) {
      return true;
    }
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    // const hasRole = () => user.roles.some((role) => roles.includes(role));
    // comenté la que está arriba que es la que trae por defecto, con la de abajo, más simplificada, tomo ya la que está en
    // el campo roles del users
    const hasRole = () => roles.includes(user.roles);
    return user && user.roles && hasRole();
  }
}
