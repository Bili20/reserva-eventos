import {
  BadRequestException,
  CallHandler,
  ExecutionContext,
  HttpException,
  Injectable,
  InternalServerErrorException,
  NestInterceptor,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';
import { appendFileSync, mkdirSync } from 'fs';
import * as path from 'path';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable()
export class ErrorsInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> {
    return next.handle().pipe(
      catchError((err) => {
        const request: Request = context.switchToHttp().getRequest();
        if (
          err instanceof BadRequestException ||
          err instanceof UnauthorizedException ||
          (err instanceof HttpException && err.getStatus() != 500)
        ) {
          return throwError(() => err);
        } else {
          const pathLog = path.join(__dirname, '../../log/');
          mkdirSync(pathLog, { recursive: true });
          appendFileSync(
            pathLog + 'errors.log',
            `${new Date().toISOString()} || mensagem: ${
              err?.message ?? err?.detail ?? err
            } || route: ${request.path} || mathod: ${request.method}\r\n`,
          );
          console.log(err);
          return throwError(
            () =>
              new InternalServerErrorException({
                message: 'Erro interno entre em contato com o suporte.',
              }),
          );
        }
      }),
    );
  }
}
