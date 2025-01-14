import { Component, OnInit, Input } from "@angular/core";
import { AddAvailabilityService } from "../../../services/availability/addAvailability.service";
import { ReloadService } from "../../../services/reload/reload.service";
import { FormsModule } from "@angular/forms";
import { NgIf, NgFor } from "@angular/common";
import dayjs from "dayjs";

@Component({
  selector: "app-add-consultations",
  imports: [FormsModule, NgIf, NgFor],
  templateUrl: "./add-consultations.component.html",
  styleUrl: "./add-consultations.component.css",
  providers: [AddAvailabilityService, ReloadService],
})
export class AddConsultationsComponent implements OnInit {
  @Input() reloadService!: ReloadService;

  weekDays: string[] = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];
  hours: string[] = Array.from(
    { length: 48 },
    (_, i) => `${Math.floor(i / 2)}:${i % 2 == 0 ? "00" : "30"}`
  );

  activeForm: "cyclical" | "oneTime" | "absence" = "cyclical";

  cyclicalAvailability = {
    startDate: "",
    endDate: "",
    days: [],
    timeSlots: [] as { start: string; end: string }[],
  };

  oneTimeAvailability = {
    date: "",
    timeSlots: [] as { start: string; end: string }[],
  };

  absence = {
    startDate: "",
    endDate: "",
  };

  constructor(private availabilityService: AddAvailabilityService) {}

  ngOnInit(): void {}

  toggleForm(form: "cyclical" | "oneTime" | "absence"): void {
    this.activeForm = form;
  }

  addCyclicalSlot(): void {
    this.cyclicalAvailability.timeSlots.push({ start: "", end: "" });
  }

  removeCyclicalSlot(index: number): void {
    this.cyclicalAvailability.timeSlots.splice(index, 1);
  }

  saveCyclicalAvailability(): void {
    this.availabilityService
      .saveCyclicalAvailability(this.cyclicalAvailability)
      .subscribe(
        () => {
          alert("Cyclical availability saved!");
          this.reloadService.triggerReload();
        },
        (error) => console.error("Error saving cyclical availability", error)
      );
  }

  addOneTimeSlot(): void {
    this.oneTimeAvailability.timeSlots.push({ start: "", end: "" });
  }

  removeOneTimeSlot(index: number): void {
    this.oneTimeAvailability.timeSlots.splice(index, 1);
  }

  saveOneTimeAvailability(): void {
    this.availabilityService
      .saveOneTimeAvailability(this.oneTimeAvailability)
      .subscribe(
        () => {
          alert("One-time availability saved!");
          this.reloadService.triggerReload();
        },
        (error) => console.error("Error saving one-time availability", error)
      );
  }

  saveAbsence(): void {
    this.availabilityService.saveAbsence(this.absence).subscribe(
      () => {
        alert("Absence saved!");
        this.reloadService.triggerReload();
      },
      (error) => console.error("Error saving absence", error)
    );
  }

  isCyclicalAvailabilityFormValid(): boolean {
    const { startDate, endDate, days, timeSlots } = this.cyclicalAvailability;

    if (
      startDate == "" ||
      endDate == "" ||
      days.length == 0 ||
      timeSlots.length == 0
    ) {
      return false;
    }
    if (
      dayjs(startDate)
        .hour(0)
        .minute(0)
        .second(0)
        .millisecond(0)
        .isBefore(dayjs().add(-1, 'day')) ||
      dayjs(endDate).isBefore(dayjs(startDate))
    ) {
      return false
    }

      return this.areTimeSlotsValid(timeSlots);
  }


  isOneTimeAvailibilityFormValid():boolean {
    const {date, timeSlots} = this.oneTimeAvailability

    if (
      date == "" ||
      timeSlots.length == 0
    ) {
      return false;
    }
    if (
      dayjs(date)
        .hour(0)
        .minute(0)
        .second(0)
        .millisecond(0)
        .isBefore(dayjs().add(-1, 'day'))
    ) {
      return false
    }

      return this.areTimeSlotsValid(timeSlots);
  }

  isAbsenceFormValid():boolean {
    const {startDate, endDate} = this.absence

    if (
      startDate == "" ||
      endDate == "" 
    ) {
      return false;
    }
    if (
      dayjs(startDate)
        .hour(0)
        .minute(0)
        .second(0)
        .millisecond(0)
        .isBefore(dayjs().add(-1, 'day')) ||
      dayjs(endDate).isBefore(dayjs(startDate))
    ) {
      return false
    }

      return true;
  }

  areTimeSlotsValid(timeSlots: { start: string; end: string }[]): boolean {
    let covered_timeslots:number[] = []

    for (let timeSlot of timeSlots) {
      if (timeSlot.start == '' || timeSlot.end == '') return false
      let startTimeSlot = this.parseHourToTimeSlot(timeSlot.start)
      const endTimeSlot = this.parseHourToTimeSlot(timeSlot.end)
      if (endTimeSlot <= startTimeSlot) return false

      while(startTimeSlot < endTimeSlot) {
        if (covered_timeslots.includes(startTimeSlot)) return false
        covered_timeslots.push(startTimeSlot)
        startTimeSlot += 1
      }
    }

    return true
  }

  parseHourToTimeSlot(timeslot: string):number {
    return parseInt(timeslot.split(':')[0]) * 2 + (timeslot.split(':')[1] == '30' ? 1 : 0)
  }

  
}
