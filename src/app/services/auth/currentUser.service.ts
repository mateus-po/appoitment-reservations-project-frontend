import { Injectable } from "@angular/core";
import { HttpClient} from "@angular/common/http";
import { Observable, BehaviorSubject } from "rxjs";
import { environment } from "../../../environments/environment";
import { tap } from 'rxjs/operators';
import { User } from "../../types/user";

@Injectable({
  providedIn: "platform",
})
export class CurrentUserService {
  private loginPath = "/auth/current_user";
  private currentUser = new BehaviorSubject<User | null>(null);
  private isAuthenticated = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient) {}

  check(): Observable<any> {
    if (this.currentUser.value) {
      return this.currentUser.asObservable();
    } else {
      return this.http.get(environment.backendURL + this.loginPath, {withCredentials:true}).pipe(
        tap(user => {
          this.currentUser.next(user as User);
          if (user) {
            this.isAuthenticated.next(true);
          }
        })
      );
    }
  }

  getAuthStatus(): Observable<boolean> {
    return this.isAuthenticated.asObservable();
  }

  getCachedUser(): Observable<any> {
    return this.currentUser.asObservable();
  }

  setAuthStatus(status: boolean, user: any) {
    this.isAuthenticated.next(status);
    this.currentUser.next(user);
  }
}
