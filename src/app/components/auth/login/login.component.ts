import { Component } from '@angular/core';
import { LoginService } from '../../../services/auth/login.service';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { NgIf } from '@angular/common';


@Component({
  selector: 'app-login',
  imports: [FormsModule, NgIf],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  providers: [LoginService, Router]
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  errorMessage: string | null = null;

  constructor(private loginService: LoginService,
     private router: Router) {}

  onSubmit() {
    this.errorMessage = null;
    this.loginService.login(this.email, this.password)
      .subscribe(response => {
        this.router.navigate(['/']).then(() => window.location.reload())
      }, error => {
        this.errorMessage = 'Invalid email or password. Please try again.';
      });
  }

  isLoginButtonDisabled() {
    return this.email == '' || this.password == ''
  }
}
