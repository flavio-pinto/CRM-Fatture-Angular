import { Injectable } from "@angular/core";
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from "@angular/common/http";

import { Observable } from "rxjs";
import { AuthService } from "./auth.service";
import { switchMap, take } from "rxjs/operators";

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(private authSrv: AuthService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    return this.authSrv.user$.pipe(
      take(1),
      switchMap((user) => {
        /* if (!user) {
          return next.handle(request);
        } */
        const newReq = request.clone({
          headers: request.headers.set(
            "Authorization",
            `Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbiIsImlhdCI6MTY0NjgxNTg4NiwiZXhwIjoxNjQ3Njc5ODg2fQ.B9aQ3-8sQuqdzd6cJefnQtoTzq8IJZhc4DkMLk8IDKMneo1TavBWpHUuGa2i4JS7aG-VDCWO6Ytczf9tvyNuYg`
          ).set('X-TENANT-ID', 'fe_0721a'),
        });

        return next.handle(newReq);
      })
    );
  }
}
