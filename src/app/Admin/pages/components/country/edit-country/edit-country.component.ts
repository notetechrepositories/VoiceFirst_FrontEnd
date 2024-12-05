import { Component, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CountryService } from '../../../../../Services/countryService/country.service';
import { SweetalertService } from '../../../../../Services/sweetAlertService/sweetalert.service';

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
  @Input() locationData: any;
  countries:Country[]=[];
 
  constructor(private router:Router,private fb: FormBuilder,private countryService:CountryService,private sweetalert:SweetalertService)
 {
    this.locationForm = this.fb.group({
      t2_1_country_name: ['', Validators.required],
      t2_1_div1_called: [''],
      t2_1_div2_called: [''],
      t2_1_div3_called: [''],
      id_t2_1_country:['']
    });
  
  }
 
  ngOnInit(): void {
   this.getData();
  }
  

  onClose(){
    this.closePopup();
    this.router.navigate(['/components/country'])
  }

  onSubmit(): void {
    const data=this.locationForm.value;
    this.countryService.updateCountry(data).subscribe({
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
        console.error('Error adding location:', error);
        alert('Failed to add location.');
      },
    });
    }
    getData(){
      if (this.locationData) {
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
    
}
