import { Component, ComponentFactoryResolver, Output, ViewChild, ViewContainerRef, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Stepper from 'bs-stepper';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidationService } from '../../../../../Services/validationService/validation.service';
import { HttpClient } from '@angular/common/http';



@Component({
  selector: 'app-company-add',
  templateUrl: './company-add.component.html',
  styleUrl: './company-add.component.css'
})
export class CompanyAddComponent implements OnInit{


  
  @Output() closePopup = () => {};

  constructor(private router:Router, private fb: FormBuilder, private http: HttpClient){}

  formcompanyadd!: FormGroup;
  companyType!: string[];
  selectedType!: string;

  ngOnInit(): void {
    this.formcompanyadd = this.fb.group({
      companyname: ['', [Validators.required]],
      email: ['', [Validators.required, ValidationService.email]],
      useremail: ['', [Validators.required, ValidationService.email]],
      inputBranchMobile: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
    });

    // Fetch data from the API
    this.http
      .get<string[]>('https://localhost:7027/api/SelectionValues?id_t4_selection=43E256AF-AC0F-4A89-AE2C-B0EAB8860C61')
      .subscribe({
        next: (data) => {
          this.companyType = data; // Initialize the array
        },
        error: (err) => {
          console.error('Error fetching company types:', err);
        },
      });

    


    const stepperElement = document.querySelector('#stepper1');
    if (stepperElement) {
      this.stepper = new Stepper(stepperElement, {
        linear: false,
        animation: true
      });
    } else {
      console.error("Stepper element not found!");
    }
  };

  private stepper!: Stepper;

  next() {
    this.stepper.next();
  }

  
  onSubmit(): void {
    if (this.formcompanyadd.valid) {
      console.log('Form Submitted:', this.formcompanyadd.value);
    } else {
      console.log('Form is invalid. Please check the errors.');
      this.formcompanyadd.markAllAsTouched(); // Mark all controls as touched to trigger validation errors
    }

    
  }

  // Helper method to check if a control has a specific error
  hasError(controlName: string, errorName: string): boolean {
    return this.formcompanyadd.get(controlName)?.hasError(errorName) ?? false;
  }
  

  



  onClose() {
    
    this.closePopup();
    this.router.navigate(['/components/company'])
    
  }

  onSave() {
    alert('Company Added!');
    this.closePopup();
  }
}
