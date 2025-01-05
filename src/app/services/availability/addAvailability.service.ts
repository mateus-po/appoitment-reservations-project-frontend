import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, forkJoin } from "rxjs";
import { environment } from "../../../environments/environment";
import dayjs from "dayjs";

@Injectable({
  providedIn: "root",
})
export class AddAvailabilityService {
  constructor(private http: HttpClient) {}

  saveCyclicalAvailability(data: any): Observable<void[]> {
    const days: string[] = [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday",
    ];
    const dayIndexes = [1, 2, 3, 4, 5, 6, 0];

    let startDate = dayjs(data.startDate)
      .hour(0)
      .minute(0)
      .second(0)
      .millisecond(0);
    const endDate = dayjs(data.endDate)
      .hour(0)
      .minute(0)
      .second(0)
      .millisecond(0);

    let result:Observable<void>[] = [];

    while (
      startDate.isBefore(endDate, "date") ||
      startDate.isSame(endDate, "date")
    ) {
      const weekDay = days[dayIndexes.indexOf(startDate.day())];

      if (!data.days.includes(weekDay)) {
        startDate = startDate.add(1, "day");
        continue;
      }

      result.push(this.saveOneTimeAvailability({
        date: startDate.format('YYYY-MM-DD'),
        timeSlots: data.timeSlots
      }))

      startDate = startDate.add(1, "day");
    }

    return forkJoin(result)
  }

  saveOneTimeAvailability(data: any): Observable<void> {
    data.offset = new Date().getTimezoneOffset();
    return this.http.post<void>(
      `${environment.backendURL}/consultations/add/one-time`,
      data,
      { withCredentials: true }
    );
  }

  saveAbsence(data: any): Observable<void> {
    data.offset = new Date().getTimezoneOffset();
    return this.http.post<void>(
      `${environment.backendURL}/consultations/add/absence`,
      data,
      { withCredentials: true }
    );
  }
}
