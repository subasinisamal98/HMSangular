import { Component, OnInit } from '@angular/core';
import { RouterModule, RouterOutlet, Router  } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common'
import { SharedService } from '../shared.service';
import { Patient } from '../patient.interface';

@Component({
  selector: 'app-patient',
  standalone: true,
  imports: [RouterModule, RouterOutlet,ReactiveFormsModule,CommonModule, FormsModule],
  templateUrl: './patient.component.html',
  styleUrl: './patient.component.css'
})
export class PatientComponent implements OnInit{

  id: number | undefined;
  patient: Patient | undefined;
  patients: Patient[] = [];
  patientForm: FormGroup;
  editPatient: Patient | null = null;
  

  constructor(private sharedService: SharedService, private fb: FormBuilder){
    //this.patients = this.sharedService.getPatients();
    this.patientForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      age: ['', [Validators.required, Validators.min(1), Validators.max(120)]],
      gender: ['', Validators.required],
      number: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      email: ['', [Validators.required, Validators.email]],
    });
  }
  
  ngOnInit(): void {
    this.loadPatients();
  }

  loadPatients(): void {
    this.patients = this.sharedService.getPatients();
  }

  addPatient(): void {
    if (this.patientForm.valid) {
      if (this.editPatient) {
        this.sharedService.updatePatient(this.editPatient.id, this.patientForm.value);
        this.editPatient = null;
      } else {
        this.sharedService.addPatient(this.patientForm.value);
      } 
        this.patientForm.reset();
        this.loadPatients(); 
    } else {
        this.patientForm.markAllAsTouched(); 
      }
           
  }

  editingPatient(patient: any): void {
    this.editPatient = patient;
    this.patientForm.patchValue(patient);
  }

  deletePatient(id: number): void {
    this.sharedService.deletePatient(id);
    this.loadPatients();
  }

}
