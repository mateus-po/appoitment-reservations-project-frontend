import { Component, OnInit } from "@angular/core";
import { CalendarComponent } from "../../calendar/calendar/calendar.component";
import { CurrentUserService } from "../../../services/auth/currentUser.service";
import { AddConsultationsComponent } from "../add-consultations/add-consultations.component";
import { User } from "../../../types/user";
import { NgIf } from "@angular/common";

@Component({
  selector: "app-dashboard",
  imports: [CalendarComponent, NgIf, AddConsultationsComponent],
  templateUrl: "./dashboard.component.html",
  styleUrl: "./dashboard.component.css",
  providers: [CurrentUserService],
})
export class DashboardComponent implements OnInit {
  currentUser: User | null = null;

  constructor(private currentCustomerService: CurrentUserService) {}

  ngOnInit(): void {
    this.currentCustomerService
      .check()
      .subscribe((response: User) => (this.currentUser = response as User));
  }
}
