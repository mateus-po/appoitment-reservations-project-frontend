import { Component } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { NgIf } from "@angular/common";
import { isEmail } from "validator";
import { RegisterService } from "../../../services/auth/register.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-register",
  imports: [FormsModule, NgIf],
  templateUrl: "./register.component.html",
  styleUrl: "./register.component.css",
  providers: [RegisterService, Router]
})
export class RegisterComponent {
  nickname: string = "";
  email: string = "";
  password: string = "";
  confirmPassword: string = "";
  errorMessage: string = "";

  constructor(private registerService: RegisterService, private router: Router) {}

  isSignUpButtonDisabled(): boolean {
    return (
      !this.nickname ||
      !this.email ||
      !isEmail(this.email) ||
      !this.password ||
      !this.confirmPassword ||
      this.password !== this.confirmPassword
    );
  }

  onSubmit(): void {
    if (this.password !== this.confirmPassword) {
      this.errorMessage = "Passwords do not match";
      return;
    }

    this.errorMessage = '';
    this.registerService.register(this.nickname, this.email, this.password)
      .subscribe(response => {
        alert("Sign up successful!");
        this.router.navigate(['/login']).then(() => window.location.reload())
      }, error => {
        console.log(error)
        this.errorMessage = error.error.error;
      });
  }
}
