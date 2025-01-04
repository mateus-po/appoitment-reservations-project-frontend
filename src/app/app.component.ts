import { Component } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
import { CurrentUserService } from './services/auth/currentUser.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NgIf } from '@angular/common';
import { User } from './types/user';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HttpClientModule, NgIf],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  providers: [CurrentUserService]
})
export class AppComponent {
  title = 'appoitment-reservations-project-frontend';
  currentUser: User | null = null

  constructor(private currentUserService: CurrentUserService) {
    this.currentUserService.check().subscribe((user: User) =>
    {
      this.currentUser = user
    })
  }

}
