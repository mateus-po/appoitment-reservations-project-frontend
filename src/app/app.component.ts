import { Component } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
import { CurrentUserService } from './services/auth/currentUser.service';
import { LogoutService } from './services/auth/logout.service';
import { NgIf } from '@angular/common';
import { User } from './types/user';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, NgIf],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  providers: [CurrentUserService]
})
export class AppComponent {
  title = 'appoitment-reservations-project-frontend';
  currentUser: User | null = null
  isAutheticated: boolean = false;

  constructor(private currentUserService: CurrentUserService, private logoutService: LogoutService) {
    this.currentUserService.check().subscribe((user: User) =>
    {
      this.currentUser = user
    })
    currentUserService.getAuthStatus().subscribe(result => {
      this.isAutheticated = result
    })
  }

  logout() {
    this.logoutService.logout()
  }

}
