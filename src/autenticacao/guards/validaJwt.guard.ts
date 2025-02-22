import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { IS_PUBLIC_KEY } from '../decorator/tornaRotaPublica.decorator';

@Injectable()
export class ValidaJwtGuard implements CanActivate {
  @Inject(JwtService)
  private jwtService: JwtService;
  @Inject(Reflector)
  private reflector: Reflector;

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: Request = context.switchToHttp().getRequest();
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (isPublic) {
      return true;
    }

    if (!request.headers.authorization) {
      throw new UnauthorizedException({
        message: 'Sem token de autenticação.',
      });
    }
    const token = request.headers.authorization.replace('Bearer ', '');

    try {
      await this.jwtService.verifyAsync(token);
      const decoded = await this.jwtService.decode(token);
      request['user'] = decoded;
      return true;
    } catch (e) {
      throw new UnauthorizedException({ message: 'Token inválido.' });
    }
  }
}
