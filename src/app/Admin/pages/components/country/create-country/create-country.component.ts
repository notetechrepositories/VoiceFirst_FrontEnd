import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CountryService } from '../../../../../Services/countryService/country.service';
import { SweetalertService } from '../../../../../Services/sweetAlertService/sweetalert.service';


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
   countries: any[] = [];

  constructor(private router:Router,private fb: FormBuilder,private countryService :CountryService,private sweetalert:SweetalertService)
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
    console.log(data);
    
    this.countryService.insertCountry(data).subscribe({
      next: (response) => {
      if(response.message=="Success"){
        this.sweetalert.showToast('success','Successfully created.');
        this.closePopup();
        this.locationForm.reset();
      }
      else{
        this.sweetalert.showToast('error',response.message);
      }

      },
      error: (error) => {
        this.sweetalert.showToast('error','Oops! Something went wrong.');
      }
    });
  }
  
  
  
}
