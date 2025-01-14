import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../../environments/environment";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class FetchDoctorsService {
  constructor(private http: HttpClient) {}
  fetch(): Observable<Object> {
    return this.http.get(`${environment.backendURL}/users/doctors`, {})
  }
}
