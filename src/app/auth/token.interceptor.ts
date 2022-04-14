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
            `Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbiIsImlhdCI6MTY0OTg1OTA2NywiZXhwIjoxNjUyMDA2NTUxfQ.NHq0u9QOpiDzPLicuTIRaFKK-Fupuu5sSBvaP-u6b6HKnkvOm-iERow-eYWDvVbcWFyFGHRh6TV5KLXyog_kJQ`
          ).set('X-TENANT-ID', 'fe_0721a'),
        });

        return next.handle(newReq);
      })
    );
  }
}
