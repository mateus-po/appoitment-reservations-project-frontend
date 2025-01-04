import { inject } from "@angular/core";
import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  Router,
  RouterStateSnapshot,
} from "@angular/router";
import { map } from "rxjs/operators";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../../environments/environment";
import { User } from "../../types/user";

export const AuthGuardDoctor: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {


  return inject(HttpClient).get(environment.backendURL + "/auth/current_user", {
      withCredentials: true,
    })
    .pipe(
      map((user) => {
        if (!user || (user as User)?.role !== 'doctor') {
          inject(Router).navigate(["/login"]);
          return false;
        }
        return true;
      })
    );
};
