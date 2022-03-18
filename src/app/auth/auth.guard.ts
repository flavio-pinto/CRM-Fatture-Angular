import { Injectable } from "@angular/core";
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from "@angular/router";
import { Observable } from "rxjs";
import { map, take } from "rxjs/operators";
import { AuthService } from "./auth.service";

@Injectable({
  providedIn: "root",
})
export class AuthGuard implements CanActivate {
  constructor(private authSrv: AuthService, private router: Router) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return this.authSrv.isLoggedIn$.pipe(
      take(1),
      map((isLoggedin) => {
        if (isLoggedin) {
          const ruoloUtente = this.authSrv.getRole();
          console.log(route.data);
          if(route.data['role'] && route.data['role'].indexOf(ruoloUtente) === -1) {
            this.router.navigate(["/utenti"]);
            return false;
          }
          return true;
        }
        return this.router.createUrlTree(["/login"]);
      })
    );
  }
}
