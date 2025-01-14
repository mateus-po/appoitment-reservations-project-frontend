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
  private appoitmentsEndpoint = "/consultations/as_user";
  private appoitmentsAsDoctorEndpoint = "/consultations/as_doctor";

  constructor(private httpClient: HttpClient) {}

  getAppointments(
    doctorID: string,
    startDate: Date,
    endDate: Date
  ): Observable<Consultation[]> {
    return this.httpClient
      .get(
        environment.backendURL +
          this.appoitmentsEndpoint +
          `/?startDate=${startDate.toISOString()}&endDate=${endDate.toISOString()}&doctorId=${doctorID}`,
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
                type: consultation.type,
                reserved: consultation.reserved
              } as Consultation;
            }
          );
        })
      );
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
                type: consultation.type,
                reserved: consultation.reserved,
                reservation: consultation.reservation
              } as Consultation;
            }
          );
        })
      );
  }
}
