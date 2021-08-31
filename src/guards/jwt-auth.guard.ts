
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';
import { JwtService } from '@nestjs/jwt'


@Injectable()
export class JwtAuthGuard implements CanActivate {

  token: string;
  result: any;
  isValide: any;

  constructor(private readonly jwtService: JwtService ) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    this.token = request.headers.authorization;
    this.result = this.jwtService.decode(request.headers.authorization, {complete: true})
    console.log(this.result)
    // this.isValide = this.jwtService.verify(request.headers.authorization, {publicKey: process.env.IS_PUBLIC_KEY} )
    // console.log(this.isValide)
    return true;
  }

}
