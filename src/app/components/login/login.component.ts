import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../services/auth/login.service';
import { HttpClientModule } from "@angular/common/http";
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { NgIf } from '@angular/common';
import { CurrentUserService } from '../../services/auth/currentUser.service';


@Component({
  selector: 'app-login',
  imports: [FormsModule, HttpClientModule, NgIf],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  providers: [LoginService, Router, CurrentUserService]
})
export class LoginComponent implements OnInit {
  email: string = '';
  password: string = '';
  errorMessage: string | null = null;

  constructor(private loginService: LoginService,
     private router: Router, private currentUserService: CurrentUserService) {}

  ngOnInit() {
      this.currentUserService.check().subscribe((user: any) => {
        if (user) {
          this.router.navigate(['/'])
        }
      })
    }

  onSubmit() {
    this.errorMessage = null;
    this.loginService.login(this.email, this.password)
      .subscribe(response => {
        this.router.navigate(['/'])
      }, error => {
        this.errorMessage = 'Invalid email or password. Please try again.';
      });
  }
}
