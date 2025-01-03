import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidationService } from '../../../../Services/validationService/validation.service';
import Stepper from 'bs-stepper';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrl: './test.component.css'
})
export class TestComponent {

  form!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      email: ['', [Validators.required, ValidationService.email]],
      password: ['', [Validators.required, ValidationService.password]],
      address: ['', Validators.required],
      address2: [''],
      city: ['', Validators.required],
      state: ['', Validators.required],
      zip: ['', [Validators.required, Validators.pattern(/^\d{5}$/)]],
      check: [false, Validators.requiredTrue]
    });
  }

  onSubmit(): void {
    if (this.form.valid) {
      console.log('Form submitted successfully', this.form.value);
    } else {
      console.log('Form is invalid');
      this.form.markAllAsTouched(); 
    }
    console.log("Working");
    
  }

  private stepper!: Stepper;

  next() {
    this.stepper.next();
  }

  // onSubmit() {
  //   return false;
  // }

  // ngOnInit() {
  //   const stepperElement = document.querySelector('#stepper1');
  //   if (stepperElement) {
  //     this.stepper = new Stepper(stepperElement, {
  //       linear: false,
  //       animation: true
  //     });
  //   } else {
  //     console.error("Stepper element not found!");
  //   }
  // }
  

}
