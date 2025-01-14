import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "../../../environments/environment";

@Injectable({
  providedIn: "root",
})
export class RegisterService {
  private loginPath = "/auth/signup";

  constructor(private http: HttpClient) {}

  register(nickname: string, email: string, password: string): Observable<any> {
    return this.http.post(
      environment.backendURL + this.loginPath,
      {
        nickname,
        email,
        password,
      }, {withCredentials: true}
    );
  }
}
