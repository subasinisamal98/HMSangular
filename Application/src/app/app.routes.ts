import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { DoctorComponent } from './doctor/doctor.component';
import { PatientComponent } from './patient/patient.component';
import { AppointmentComponent } from './appointment/appointment.component';
import { ReactiveFormsModule } from '@angular/forms';

export const routes: Routes = [
    { path: '', redirectTo: '/doctor', pathMatch: 'full'},
    {path: 'doctor', component: DoctorComponent},
    {path: 'patient', component: PatientComponent},
    {path: 'appointment', component: AppointmentComponent},
];

@NgModule({
    imports: [RouterModule.forRoot(routes),ReactiveFormsModule],
    exports: [RouterModule]
})
export class AppRoutingModule{}
