import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, catchError, of } from "rxjs";
import { environment } from "../../../environments/environment";

@Injectable({
  providedIn: "root",
})
export class CancelReservationsService {
  constructor(private http: HttpClient) {}

  cancel(reservationId: string): Observable<void | any> {
    return this.http
      .post<void>(
        `${environment.backendURL}/reservations/cancel`,
        { reservationId },
        { withCredentials: true }
      )
      .pipe(
        catchError((error) => {
          if (error.error) {
            return of(error.error);
          }
          throw error;
        })
      );
  }
}
