import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, catchError, of } from "rxjs";
import { environment } from "../../../environments/environment";

@Injectable({
  providedIn: "root",
})
export class FetchReservationsService {
  constructor(private http: HttpClient) {}

  fetch(): Observable<void | any> {
    return this.http.get<void>(
      `${environment.backendURL}/reservations/`,
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
