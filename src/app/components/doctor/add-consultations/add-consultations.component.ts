import { Component, OnInit, Input } from "@angular/core";
import { AddAvailabilityService } from "../../../services/availability/addAvailability.service";
import { ReloadService } from "../../../services/reload/reload.service";
import { FormsModule } from "@angular/forms";
import { NgIf, NgFor } from "@angular/common";

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
          alert("One-time availability saved!")
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
}
