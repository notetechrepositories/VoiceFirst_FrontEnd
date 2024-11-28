import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CountryService } from '../../../../../Services/countryService/country.service';


export interface Country {
  t2_1_country_name: string;
  t2_1_div1_called: string;
  t2_1_div2_called: string;
  t2_1_div3_called: string;
}


@Component({
  selector: 'app-create-country',
  templateUrl: './create-country.component.html',
  styleUrl: './create-country.component.css'
})
export class CreateCountryComponent {

  locationForm: FormGroup;
  @Output() closePopup = () => {};
  @Output() countryAdded = new EventEmitter<any>();
   countries: any[] = [];

  constructor(private router:Router,private fb: FormBuilder,private countryService :CountryService)
  {

    this.locationForm = this.fb.group({
      t2_1_country_name: ['', Validators.required],
      t2_1_div1_called: [''],
      t2_1_div2_called: [''],
      t2_1_div3_called: [''],
    });
   
  }

  

  onClose() {
    this.closePopup();
    this.router.navigate(['/components/country'])
  }



  onSubmit(): void {
    const data=this.locationForm.value;
    this.countryService.insertCountry(data).subscribe({
      next: (response) => {
        console.log('Location added successfully:', response);
        this.closePopup();
        this.countries.push(data);
        this.countryAdded.emit(response);
        this.locationForm.reset();
      },
      error: (error) => {
        console.error('Error adding location:', error);
        alert('Failed to add location.');
      },
    });
  }
  
  
  
}
