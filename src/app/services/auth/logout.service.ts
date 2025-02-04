import { Injectable } from "@angular/core";
import { CookieService } from "ngx-cookie-service";

@Injectable({
  providedIn: "root",
})
export class LogoutService {

  constructor(private cookieService: CookieService) {}

  logout(): void {
    this.cookieService.delete('jwt');
    window.location.reload()
  }
}
