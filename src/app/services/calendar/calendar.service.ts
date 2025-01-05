import { Injectable } from "@angular/core";
import { Observable, of, map } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../../environments/environment";
import { Consultation, ConsultationResponse } from "../../types/consultation";
import dayjs from "dayjs";
// @ts-ignore
import dayjsPluginUTC from "dayjs-plugin-utc";
dayjs.extend(dayjsPluginUTC);

@Injectable({
  providedIn: "root",
})
export class CalendarService {
  private appoitmentsEndpoint = "";
  private appoitmentsAsDoctorEndpoint = "/consultations/as_doctor";

  constructor(private httpClient: HttpClient) {}

  getAppointments(
    doctorID: string,
    startDate: Date,
    endDate: Date
  ): Observable<{ [key: string]: string[] }> {
    return of({
      Monday: [
        "10:30 Appointment A",
        "11:00 Appoitment Z",
        "14:00 Appointment B",
      ],
      Tuesday: ["11:00 Appointment C", "15:30 Appointment D"],
      Wednesday: [],
      Thursday: ["13:00 Appointment E"],
      Friday: ["16:30 Appointment F"],
      Saturday: [],
      Sunday: ["12:00 Appointment G"],
    });
  }

  getAppoitmentsAsDoctor(
    startDate: Date,
    endDate: Date
  ): Observable<Consultation[]> {
    return this.httpClient
      .get(
        environment.backendURL +
          this.appoitmentsAsDoctorEndpoint +
          `/?startDate=${startDate.toISOString()}&endDate=${endDate.toISOString()}`,
        { withCredentials: true }
      )
      .pipe(
        map((result) => {
          return (result as ConsultationResponse[]).map(
            (consultation: ConsultationResponse) => {
              const date = dayjs
              // @ts-ignore
                .utc(consultation.date)
                .hour(consultation.timeslot / 2)
                .minute(30 * (consultation.timeslot % 2))
                .local()
                .toDate();

              return {
                date,
                type: consultation.type
              } as Consultation;
            }
          );
        })
      );
  }
}
