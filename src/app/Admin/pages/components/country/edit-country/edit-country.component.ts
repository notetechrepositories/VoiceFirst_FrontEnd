import { Component, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-country',
  templateUrl: './edit-country.component.html',
  styleUrl: './edit-country.component.css'
})
export class EditCountryComponent {
  locationForm: FormGroup;
  @Output() closePopup = () => {};


  constructor(private router:Router,private fb: FormBuilder)
 {
    this.locationForm = this.fb.group({
      country: ['', Validators.required],
      div1: [''],
      div2: [''],
      div3: [''],
    });
  
  }
  @Input() locationData: any;
  ngOnInit(): void {
    if (this.locationData) {
      console.log(this.locationData);
      
      this.locationForm.patchValue({
        country: this.locationData.country,
        div1: this.locationData.division1,
        div2: this.locationData.division2,
        div3: this.locationData.division3
      });
    }
  }
  

  onClose() {
    this.closePopup();
    this.router.navigate(['/components/country'])
  }

  onSubmit(): void {
      if (this.locationForm.valid) {
        const newLocation = this.locationForm.value;
        // this.locations.push(newLocation); // Add new location to the list
        this.locationForm.reset(); // Reset the form
      }
    }
    
}
