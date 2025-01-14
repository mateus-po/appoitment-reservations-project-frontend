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

export const LoggedOutGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {


  return inject(HttpClient).get(environment.backendURL + "/auth/current_user", {
      withCredentials: true,
    })
    .pipe(
      map((user) => {
        if (user) {
          inject(Router).navigate(["/"]);
          return false;
        }
        return true;
      })
    );
};
