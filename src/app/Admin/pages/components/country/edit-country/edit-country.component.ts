import { Component, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CountryService } from '../../../../../Services/countryService/country.service';

export interface Country {
  id_t2_1_country:string;
  t2_1_country_name: string;
  t2_1_div1_called: string;
  t2_1_div2_called: string;
  t2_1_div3_called: string;
}


@Component({
  selector: 'app-edit-country',
  templateUrl: './edit-country.component.html',
  styleUrl: './edit-country.component.css'
})
export class EditCountryComponent {
  locationForm: FormGroup;
  @Output() closePopup = () => {};
  countries:Country[]=[];
 
  constructor(private router:Router,private fb: FormBuilder,private countryService:CountryService)
 {
    this.locationForm = this.fb.group({
      t2_1_country_name: ['', Validators.required],
      t2_1_div1_called: [''],
      t2_1_div2_called: [''],
      t2_1_div3_called: [''],
      id_t2_1_country:['']
    });
  
  }
  @Input() locationData: any;
  ngOnInit(): void {
    if (this.locationData) {
      console.log(this.locationData);
      const data=this.locationData.Items;
      this.locationForm.patchValue({
        t2_1_country_name: data.t2_1_country_name,
        t2_1_div1_called: data.t2_1_div1_called,
        t2_1_div2_called: data.t2_1_div2_called,
        t2_1_div3_called: data.t2_1_div3_called,
        id_t2_1_country:data.id_t2_1_country
      });
    }
  }
  

  onClose() {
    this.closePopup();
    this.router.navigate(['/components/country'])
  }
  onSubmit(): void {
    const data=this.locationForm.value;
    console.log(data);
    
    this.countryService.updateCountry(data).subscribe({
      next: (response) => {
        console.log('Location updated successfully:', response);
        this.closePopup();
        this.locationForm.reset();
      },
      error: (error) => {
        console.error('Error adding location:', error);
        alert('Failed to add location.');
      },
    });
    }
    
}
