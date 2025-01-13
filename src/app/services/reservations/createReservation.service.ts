import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, forkJoin } from "rxjs";
import { environment } from "../../../environments/environment";
import dayjs from "dayjs";

@Injectable({
  providedIn: "root",
})
export class CreateReservationService {
  constructor(private http: HttpClient) {}

  createReservation(data: any): Observable<void> {
    data.offset = new Date().getTimezoneOffset();
    return this.http.post<void>(
      `${environment.backendURL}/reservations/create`,
      data,
      { withCredentials: true }
    );
  }


}
