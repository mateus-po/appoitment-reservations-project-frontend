import { Component, OnInit } from "@angular/core";
import { FetchDoctorsService } from "../../../services/doctor/fetchDoctors.service";
import { User } from "../../../types/user";
import { NgFor, NgIf } from "@angular/common";

@Component({
  selector: "app-doctors-list",
  imports: [NgFor, NgIf],
  templateUrl: "./doctors-list.component.html",
  styleUrl: "./doctors-list.component.css",
  providers: [FetchDoctorsService]
})
export class DoctorsListComponent implements OnInit {
  doctors: User[] = []
  constructor(private fetchDoctorsService: FetchDoctorsService) {}

  ngOnInit(): void {
    this.fetchDoctorsService.fetch().subscribe(doctors => this.doctors = doctors as User[])
  }
}
