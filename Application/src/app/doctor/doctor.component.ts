import { Component, OnInit } from '@angular/core';
import { RouterModule, RouterOutlet, Router  } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common'
import { SharedService } from '../shared.service';

@Component({
  selector: 'app-doctor',
  standalone: true,
  imports: [RouterModule, RouterOutlet,ReactiveFormsModule,CommonModule, FormsModule],
  templateUrl: './doctor.component.html',
  styleUrl: './doctor.component.css'
})

export class DoctorComponent implements OnInit {
  doctorForm: FormGroup | any;
  doctors: any[] = [];
  isEditMode: boolean = false;
  currentDoctorId: number | null = null;

  constructor(private fb: FormBuilder, private sharedService: SharedService) {}

  ngOnInit(): void {
    this.loadData();
    this.doctorForm = this.fb.group({
      name: ['', Validators.required],
      specialization: ['', Validators.required],
      availability: ['', Validators.required],
    });
  }

  loadData() {
    this.doctors = this.sharedService.getDoctors();
  }

  onSubmit() {
    if (this.doctorForm.valid) {
      const doctorData = this.doctorForm.value;
      if (this.isEditMode && this.currentDoctorId) {
        // Update doctor
        this.sharedService.updateDoctor(this.currentDoctorId, doctorData);
      } else {
        // Add new doctor
        this.sharedService.addDoctor(doctorData);
      }
      this.resetForm();
      this.loadData();
    }else {
        this.doctorForm.markAllAsTouched(); 
      }
  }

  editDoctor(doctor: any) {
    this.isEditMode = true;
    this.currentDoctorId = doctor.id;
    this.doctorForm.setValue({
      name: doctor.name,
      specialization: doctor.specialization,
      availability: doctor.availability,
    });
  }

  deleteDoctor(doctorId: number) {
    this.sharedService.deleteDoctor(doctorId);
    this.loadData();
  }

  resetForm() {
    this.doctorForm.reset();
    this.isEditMode = false;
    this.currentDoctorId = null;
  }
}
