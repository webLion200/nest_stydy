import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Reflector } from '@nestjs/core';
import { Roles } from './roles.decorator';

@Injectable()
export class RolesGuard implements CanActivate {

  constructor(private reflector: Reflector) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const roles = this.reflector.get(Roles, context.getHandler())
    if(!roles) {
      return true
    }
    const request = context.switchToHttp().getRequest()
    const user = request.user;
    return matchRoles(roles, user.roles)
  }
}
function matchRoles(roles: string[], roles1: any): boolean | Promise<boolean> | Observable<boolean> {
  throw new Error('Function not implemented.');
}

