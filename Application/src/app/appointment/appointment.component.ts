import { Component, OnInit } from '@angular/core';
import { RouterModule, RouterOutlet, Router  } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SharedService } from '../shared.service';

@Component({
  selector: 'app-appointment',
  standalone: true,
  imports: [RouterModule, RouterOutlet,ReactiveFormsModule,CommonModule, FormsModule],
  templateUrl: './appointment.component.html',
  styleUrl: './appointment.component.css'
})

export class AppointmentComponent implements OnInit {
  appointmentForm: FormGroup | any;
  appointments: any[] = [];
  doctors: any[] = [];
  isEditMode: boolean = false;
  currentAppointmentId: number | null = null;

  constructor(private fb: FormBuilder, private sharedService: SharedService) {}

  ngOnInit(): void {
    this.loadData();
    this.appointmentForm = this.fb.group({
      patientName: ['', Validators.required],
      doctor: ['', Validators.required],
      date: ['', Validators.required],
    });
  }

  loadData() {
    this.doctors = this.sharedService.getDoctors();
    this.appointments = this.sharedService.getAppointments();
  }

  onSubmit() {
    if (this.appointmentForm.valid) {
      const appointmentData = this.appointmentForm.value;
      if (this.isEditMode && this.currentAppointmentId) {
        this.sharedService.updateAppointment(this.currentAppointmentId, appointmentData);
      } else {      
        this.sharedService.addAppointment(appointmentData);
      }
      this.resetForm();
      this.loadData();
    }else {
        this.appointmentForm.markAllAsTouched(); 
      }
  }

  editAppointment(appointment: any) {
    this.isEditMode = true;
    this.currentAppointmentId = appointment.id;
    this.appointmentForm.setValue({
      patientName: appointment.patientName,
      doctor: appointment.doctor,
      date: appointment.date,
    });
  }

  deleteAppointment(appointmentId: number) {
    this.sharedService.deleteAppointment(appointmentId);
    this.loadData();
  }

  resetForm() {
    this.appointmentForm.reset();
    this.isEditMode = false;
    this.currentAppointmentId = null;
  }
}
