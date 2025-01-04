import { Routes } from "@angular/router";
import { LoginComponent } from "./components/login/login.component";
import { DashboardComponent } from "./components/doctor/dashboard/dashboard.component";
import { AuthGuardDoctor } from "./services/auth/authGuardDoctor.service";

export const routes: Routes = [
  { path: "login", component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuardDoctor]},
];
