import { Component, OnInit, ResourceRef } from "@angular/core";
import { NgIf, NgFor } from "@angular/common";
import { FetchReservationsService } from "../../../services/reservations/fetchReservations.service";
import { CancelReservationsService } from "../../../services/reservations/cancelReservation.service";
import { Reservation } from "../../../types/reservation";
import dayjs from "dayjs";
// @ts-ignore
import dayjsPluginUTC from "dayjs-plugin-utc";
dayjs.extend(dayjsPluginUTC);

@Component({
  selector: "app-user-reservations",
  imports: [NgIf, NgFor],
  templateUrl: "./user-reservations.component.html",
  styleUrl: "./user-reservations.component.css",
  providers: [FetchReservationsService, CancelReservationsService],
})
export class UserReservationsComponent implements OnInit {
  reservations: Reservation[] = [];

  constructor(
    private fetchResercationsService: FetchReservationsService,
    private cancelReservationService: CancelReservationsService
  ) {}

  ngOnInit(): void {
    this.fetchResercationsService
      .fetch()
      .subscribe((result: Reservation[]) => (this.reservations = result));
  }

  formatDuration(hour: number): string {
    const displayHour = Math.floor(hour / 2);
    const displayMinutes = hour % 2 == 1 ? " 30min" : "";

    let result = "";
    if (displayHour > 0) {
      result += `${displayHour}h`;
    }
    result += displayMinutes;
    return result;
  }

  formatTime(utc_date: string, timeslot: number): string {
    return (
      dayjs
        // @ts-ignore
        .utc(utc_date)
        .hour(Math.floor(timeslot / 2))
        .minute((30 * timeslot) % 2)
        .local()
        .format("DD-MM-YYYY HH:mm")
    );
  }

  cancelReservation(reservationId: string): void {
    this.cancelReservationService.cancel(reservationId).subscribe(_ => {
      const reservation = this.reservations.find((r:Reservation) => r._id == reservationId)
      if (reservation) {
        reservation.cancelled = true
      }
    }, error => console.log(error.error.error))
  }
}
