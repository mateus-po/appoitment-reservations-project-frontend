import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "../../../environments/environment";

@Injectable({
  providedIn: "root",
})
export class AddAvailabilityService {
  private baseUrl = "https://placeholder-api.com/availability"; // Placeholder API URL

  constructor(private http: HttpClient) {}

  saveCyclicalAvailability(data: any): Observable<void> {
    console.log(data);
    return this.http.post<void>(`${this.baseUrl}/cyclical`, data);
  }

  saveOneTimeAvailability(data: any): Observable<void> {
    data.offset = new Date().getTimezoneOffset()
    console.log(data);
    return this.http.post<void>(
      `${environment.backendURL}/consultations/add/one-time`,
      data, {withCredentials: true}
    );
  }

  saveAbsence(data: any): Observable<void> {
    console.log(data);
    return this.http.post<void>(`${this.baseUrl}/absence`, data);
  }
}
