import { HttpService } from '@nestjs/axios';
import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { map, mergeMap, tap } from 'rxjs/operators';
import { IS_PUBLIC_KEY } from 'src/decorators/public.decorator';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private http: HttpService,
    private reflector: Reflector,
  ) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();

    // Exception for the route with the decorator @Public()
    // https://docs.nestjs.com/security/authentication#enable-authentication-globally

    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isPublic) {
      return true;
    }

    // Get the id of the public key from the jwt

    const decodedJwt: any = this.jwtService.decode(
      request.headers.authorization,
      { complete: true },
    );

    if (decodedJwt) {
      const kid = decodedJwt.header.kid;

      // Retrieve the public key from google api (with the id) and validate the signature

      return this.http
        .get(
          'https://www.googleapis.com/robot/v1/metadata/x509/securetoken@system.gserviceaccount.com',
        )
        .pipe(
          map((res) => res.data[kid]),
          mergeMap((publicKey) =>
            this.jwtService.verifyAsync(request.headers.authorization, {
              publicKey: publicKey,
            }),
          ),
          tap(() => of(true)),
          catchError(() => {
            return of(false);
          }),
        );
    } else {
      return false;
    }
  }
}
