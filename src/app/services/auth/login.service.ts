import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "../../../environments/environment";

@Injectable({
  providedIn: "root",
})
export class LoginService {
  private loginPath = "/auth/login";

  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<any> {
    return this.http.post(
      environment.backendURL + this.loginPath,
      {
        email,
        password,
      }, {withCredentials: true}
    );
  }
}
