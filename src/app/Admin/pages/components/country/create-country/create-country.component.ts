import { Component, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-country',
  templateUrl: './create-country.component.html',
  styleUrl: './create-country.component.css'
})
export class CreateCountryComponent {
  locationForm: FormGroup;
  @Output() closePopup = () => {};

  locations = [
    { country: 'USA', division1: 'County', division2: 'City-Towns' },
    { country: 'England', division1: 'County', division2: 'District' },
    { country: 'India', division1: 'State', division2: 'District', division3: 'City-Town-Village' },
    { country: 'Scotland', division1: 'County', division2: 'City - Town - Village'}
    
  ];
  constructor(private router:Router,private fb: FormBuilder)
 {
    this.locationForm = this.fb.group({
      country: ['', Validators.required],
      div1: [''],
      div2: [''],
      div3: [''],
    });
    this.locationForm = this.fb.group({
      country: [''],
    });
  }

  onClose() {
    this.closePopup();
    this.router.navigate(['/components/country'])
  }

  onSubmit(): void {
      if (this.locationForm.valid) {
        const newLocation = this.locationForm.value;
        this.locations.push(newLocation); // Add new location to the list
        this.locationForm.reset(); // Reset the form
      }
    }
  
}
