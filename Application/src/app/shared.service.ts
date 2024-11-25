import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  
  constructor() {
    if (!localStorage.getItem('patients')) localStorage.setItem('patients', JSON.stringify([]));
    if (!localStorage.getItem('doctors')) localStorage.setItem('doctors', JSON.stringify([]));
    if (!localStorage.getItem('appointments')) localStorage.setItem('appointments', JSON.stringify([]));
  }

  private getFromStorage(key: string): any[] {
    return JSON.parse(localStorage.getItem(key) || '[]');
  }

  private saveToStorage(key: string, data: any[]): void {
    localStorage.setItem(key, JSON.stringify(data));
  }

  getPatients(): any[] {
    return this.getFromStorage('patients');
  }

  addPatient(patient: any): void {
    const patients = this.getPatients();
    patients.push({ id: Date.now(), ...patient });
    this.saveToStorage('patients', patients);
  }

  updatePatient(id: number, updatedData: any): void {
    const patients = this.getPatients();
    const index = patients.findIndex(p => p.id === id);
    if (index !== -1) {
      patients[index] = { ...patients[index], ...updatedData };
      this.saveToStorage('patients', patients);
    }
  }

  deletePatient(id: number): void {
    const patients = this.getPatients().filter(p => p.id !== id);
    this.saveToStorage('patients', patients);
  }

  getDoctors(): any[] {
    return this.getFromStorage('doctors');
  }

  addDoctor(doctor: any): void {
    const doctors = this.getDoctors();
    doctors.push({ id: Date.now(), ...doctor });
    this.saveToStorage('doctors', doctors);
  }

  updateDoctor(id: number, updatedData: any): void {
    const doctors = this.getDoctors();
    const index = doctors.findIndex(d => d.id === id);
    if (index !== -1) {
      doctors[index] = { ...doctors[index], ...updatedData };
      this.saveToStorage('doctors', doctors);
    }
  }

  deleteDoctor(id: number): void {
    const doctors = this.getDoctors().filter(d => d.id !== id);
    this.saveToStorage('doctors', doctors);
  }

  // Appointments
  getAppointments(): any[] {
    return this.getFromStorage('appointments');
  }

  addAppointment(appointment: any): void {
    const appointments = this.getAppointments();
    appointments.push({ id: Date.now(), ...appointment });
    this.saveToStorage('appointments', appointments);
  }

  updateAppointment(id: number, updatedData: any): void {
    const appointments = this.getAppointments();
    const index = appointments.findIndex(a => a.id === id);
    if (index !== -1) {
      appointments[index] = { ...appointments[index], ...updatedData };
      this.saveToStorage('appointments', appointments);
    }
  }

  deleteAppointment(id: number): void {
    const appointments = this.getAppointments().filter(a => a.id !== id);
    this.saveToStorage('appointments', appointments);
  }
}
