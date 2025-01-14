import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, catchError, of } from "rxjs";
import { environment } from "../../../environments/environment";
import dayjs from "dayjs";

@Injectable({
  providedIn: "root",
})
export class CreateReservationService {
  constructor(private http: HttpClient) {}

  createReservation(data: any): Observable<void | any> {
    data.offset = new Date().getTimezoneOffset();
    return this.http.post<void>(
      `${environment.backendURL}/reservations/create`,
      data,
      { withCredentials: true }
    ).pipe(
      catchError((error) => {
        if (error.error) {
          return of(error.error)
        }
        throw error
      })
    );
  }


}
