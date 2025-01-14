import { Routes } from "@angular/router";
import { LoginComponent } from "./components/auth/login/login.component";
import { RegisterComponent } from "./components/auth/register/register.component";
import { DashboardComponent } from "./components/doctor/dashboard/dashboard.component";
import { HomePageComponent } from "./components/home-page/home-page.component";
import { AuthGuardDoctor } from "./services/auth/authGuardDoctor.service";
import { AuthGuard } from "./services/auth/authGuard.service";
import { LoggedOutGuard } from "./services/auth/loggedOutGuard.service";
import { DoctorsListComponent } from "./components/doctor/doctors-list/doctors-list.component";
import { DoctorScheduleComponent } from "./components/doctor/doctor-schedule/doctor-schedule.component";


export const routes: Routes = [
  { path: "", component: HomePageComponent },
  { path: "doctors", component: DoctorsListComponent },
  { path: "doctor_schedule", component: DoctorScheduleComponent, canActivate: [AuthGuard] },
  { path: "login", component: LoginComponent, canActivate: [LoggedOutGuard] },
  { path: "register", component: RegisterComponent, canActivate: [LoggedOutGuard] },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuardDoctor]},
];
