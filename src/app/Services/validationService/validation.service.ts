import { Injectable } from '@angular/core';
import { AbstractControl, ValidationErrors } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ValidationService {

  constructor() { }

  static email(control: AbstractControl): ValidationErrors | null {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(control.value) ? null : { invalidEmail: true };
  }
  static phone(control: AbstractControl): ValidationErrors | null{
    const phoneRegex= /^\+?\d+$/;
    const value = control.value;
    if (!value) {
      return null;
  }
    return phoneRegex.test(control.value) ? null : {invalidPhone: true};
  }

  static personName(control: AbstractControl): ValidationErrors | null{
    const personNameRegex=/^[a-zA-Z'-\s]{2,50}$/; // Allow letters, hyphens, apostrophes, and spaces
    const value=control.value;
    if (!value) {
      return null; // Return null if no value (not required validation)
  }
  return personNameRegex.test(value) ? null : { invalidName: true };
  }

  static password(control: AbstractControl): ValidationErrors | null {
    const value = control.value || '';
    const hasNumber = /\d/.test(value);
    const hasUpperCase = /[A-Z]/.test(value);
    const hasLowerCase = /[a-z]/.test(value);
    const hasMinLength = value.length >= 6;

    const valid = hasNumber && hasUpperCase && hasLowerCase && hasMinLength;
    return valid ? null : { invalidPassword: true };
  }
}
