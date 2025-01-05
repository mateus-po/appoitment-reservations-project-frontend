import { Component, OnInit, OnDestroy, Input } from "@angular/core";
import { CalendarService } from "../../../services/calendar/calendar.service";
import { ReloadService } from "../../../services/reload/reload.service";
import { NgFor, CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { User } from "../../../types/user";
import { Consultation } from "../../../types/consultation";
import { Subscription } from 'rxjs';
import dayjs from "dayjs";

@Component({
  selector: "app-calendar",
  imports: [NgFor, FormsModule, CommonModule],
  templateUrl: "./calendar.component.html",
  styleUrl: "./calendar.component.css",
  providers: [CalendarService, ReloadService],
})
export class CalendarComponent implements OnInit, OnDestroy {
  @Input() doctorID!: string;
  @Input() currentUser!: User;
  @Input() reloadService!: ReloadService;
  private subscription!: Subscription;

  days: string[] = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];
  startHour: number = 10;
  endHour: number = 18;
  currentWeek: Date[] = [];
  appointments: Consultation[] = [];

  constructor(private calendarService: CalendarService) {}

  ngOnInit(): void {
    this.setWeek(dayjs());
    this.fetchAppointments();
    this.subscription = this.reloadService.reload$.subscribe((shouldReload) => {
      if (shouldReload) {
        this.fetchAppointments();
      }
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  get hourRange(): number[] {
    return Array.from(
      { length: this.endHour * 2 - this.startHour * 2 },
      (_, i) => this.startHour * 2 + i
    );
  }

  formatHour(hour: number): string {
    const displayHour = Math.floor(hour / 2);
    return `${displayHour}:${hour % 2 == 0 ? "00" : "30"}`;
  }

  setWeek(startDate: dayjs.Dayjs): void {
    if (startDate.day() === 0) {
      startDate = startDate.add(-7, 'days')
    }
    startDate = startDate.day(1).hour(0).minute(0).second(0).millisecond(0)

    this.currentWeek = Array.from({ length: 7 }, (_, i) => {
      return startDate.add(i, 'days').toDate()
    });
  }

  fetchAppointments(): void {
    if (this.currentUser.role == "doctor") {
      this.calendarService
        .getAppoitmentsAsDoctor(this.currentWeek[0],
           dayjs(this.currentWeek[6]).add(24, 'hours').toDate())
        .subscribe((data) => {
          this.appointments = data
        });
      return;
    }
    this.calendarService
      .getAppointments(this.doctorID, this.currentWeek[0], this.currentWeek[6])
      .subscribe((data) => {
        // this.appointments = data;
      });
  }

  previousWeek(): void {
    const firstDay = this.currentWeek[0];
    this.setWeek(dayjs(firstDay).add(-7, 'days'));
    this.fetchAppointments();
  }

  nextWeek(): void {
    const firstDay = this.currentWeek[0];
    this.setWeek(dayjs(firstDay).add(7, 'days'));
    this.fetchAppointments();
  }

  isToday(date: Date): boolean {
    const today = new Date();
    return date.toDateString() === today.toDateString();
  }

  isCurrentTimeSlot(date: Date, hour: number): boolean {
    const now = new Date();
    return (
      this.isToday(date) &&
      now.getHours() === Math.floor(hour / 2) &&
      ((now.getMinutes() >= 30 && hour % 2 == 1) ||
        (now.getMinutes() < 30 && hour % 2 == 0))
    );
  }

  isCurrentHour(hour: number): boolean {
    const now = new Date();
    return now.getHours() === Math.floor(hour / 2) &&
    ((now.getMinutes() >= 30 && hour % 2 == 1) ||
    (now.getMinutes() < 30 && hour % 2 == 0));
  }

  getSlotsForTime(date: Date, hour: number): Consultation[] {
    const hoursAndMinutes = this.formatHour(hour).split(":");
    return this.appointments.filter((appointment) => {
      return (
        date.getDate() == appointment.date.getDate() &&
        appointment.date.getHours() == parseInt(hoursAndMinutes[0]) &&
        appointment.date.getMinutes() == parseInt(hoursAndMinutes[1])
      );
    });
  }

  isAbsence(slot: Consultation) {
    return slot.type === 'absence'
  }
}
