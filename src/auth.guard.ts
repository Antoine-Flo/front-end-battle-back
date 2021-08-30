// import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
// import { Observable } from 'rxjs';
// import * as admin from 'firebase-admin';


// @Injectable()
// export class AuthGuard implements CanActivate {
//   canActivate(
//     context: ExecutionContext,
//   ): boolean | Promise<boolean> | Observable<boolean> {
//     const request = context.switchToHttp().getRequest();

//     admin
//       .auth()
//       .verifyIdToken("46521--Example")
//     //   .verifyIdToken(idToken)
//       .then((decodedToken) => {
//         const uid = decodedToken.uid;
//         console.log("Firebase token verified")
//     })
//     .catch((error) => {
//           console.log("User unauthenticated")
//       });

//     return true;
//     // return validateRequest(request);
//   }
// }
