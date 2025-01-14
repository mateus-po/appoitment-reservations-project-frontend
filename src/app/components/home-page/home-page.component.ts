import { Component, OnInit } from '@angular/core';
import { FetchDoctorsService } from '../../services/doctor/fetchDoctors.service';
import { User } from '../../types/user';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-home-page',
  imports: [],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css',
  providers: [FetchDoctorsService]
})
export class HomePageComponent implements OnInit {
  doctors: User[] = []

  constructor(private fetchDoctorsService: FetchDoctorsService) {}
  ngOnInit(): void {
    this.fetchDoctorsService.fetch().subscribe((doctors) => this.doctors = (doctors as User[]))
  }
}
