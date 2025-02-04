import { Component, OnInit, OnDestroy } from "@angular/core";
import { FetchDoctorsService } from "../../../services/doctor/fetchDoctors.service";
import { CurrentUserService } from "../../../services/auth/currentUser.service";
import { ReloadService } from "../../../services/reload/reload.service";
import { PassSelectedTimeSlotService } from "../../../services/reload/passSelectedTimeSlot.service";
import { CreateReservationService } from "../../../services/reservations/createReservation.service";
import { User } from "../../../types/user";
import { NgFor, NgIf, CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { CalendarComponent } from "../../calendar/calendar/calendar.component";
import { Subscription } from "rxjs";

@Component({
  selector: "app-doctor-schedule",
  imports: [NgFor, NgIf, FormsModule, CalendarComponent, CommonModule],
  templateUrl: "./doctor-schedule.component.html",
  styleUrl: "./doctor-schedule.component.css",
  providers: [
    FetchDoctorsService,
    CurrentUserService,
    ReloadService,
    PassSelectedTimeSlotService,
    CreateReservationService,
  ],
})
export class DoctorScheduleComponent implements OnInit, OnDestroy {
  doctors: User[] = [];
  currentUser: User | null = null;
  selectedDoctorId: string | null = null;
  selectedStartDate: Date | null = null;
  selectedStartTimeSlot: number | null = null;
  selectableDurations = Array.from({ length: 8 }, (_, i) => i + 1);
  selectableGenders = ['Male', 'Female', 'Other']
  selectableReservationTypes = ['First Consultation', 'Follow-up visit', 'Chronic disease', 'Receipt'];
  showCalendar = false
  private subscription!: Subscription;

  appointmentDetails = {
    consultationLength: 0,
    consultationType: "",
    patientName: "",
    patientGender: "",
    patientAge: null,
    doctorNotes: "",
  };
  errorMessage: string | null = null;

  constructor(
    private fetchDoctorsService: FetchDoctorsService,
    private currentUserService: CurrentUserService,
    private createReservationService: CreateReservationService,
    public passSelectedTimeSlotService: PassSelectedTimeSlotService,
    public reloadService: ReloadService
  ) {}

  ngOnInit(): void {
    this.fetchDoctorsService.fetch().subscribe((doctors) => {
      this.selectedStartTimeSlot = null;
      this.doctors = doctors as User[];
    });
    this.currentUserService
      .check()
      .subscribe((user) => (this.currentUser = user));

    this.subscription = this.passSelectedTimeSlotService.reload$.subscribe(
      (data) => {
        if (data.length == 0) {
          return;
        }
        this.selectedStartDate = data[0] as Date;
        this.selectedStartTimeSlot = data[1] as number;
      }
    );
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  formatHour(hour: number): string {
    const displayHour = Math.floor(hour / 2);
    return `${displayHour}:${hour % 2 == 0 ? "00" : "30"}`;
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

  submitAppointment(): void {
    this.errorMessage = null;

    if (this.hasTimeConflict(this.appointmentDetails.consultationLength)) {
      this.errorMessage =
        "There is a conflict with other reservations";
      return;
    }

    this.createReservationService.createReservation({
      ...this.appointmentDetails,
      doctorId: this.selectedDoctorId,
      startDate: this.selectedStartDate?.toDateString(),
      startTimeSlot: this.formatHour(this.selectedStartTimeSlot ?? 0)
    }).subscribe(response => {
      if (response.error) {
        this.errorMessage = response.error
        return
      }
      this.reloadService.triggerReload()
      alert('Reservation created successfully')
    })
  }

  hasTimeConflict(length: number): boolean {
    return false;
  }

  onDoctorChange() {
    this.selectedStartDate = null
    this.selectedStartTimeSlot = null

    this.appointmentDetails = {
      consultationLength: 0,
      consultationType: "",
      patientName: "",
      patientGender: "",
      patientAge: null,
      doctorNotes: "",
    };
    this.errorMessage = null
    this.showCalendar = false
    setTimeout(() => {
      this.showCalendar = true;
    }, 10);
  }
}
