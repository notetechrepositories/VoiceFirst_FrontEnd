import { Component, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SweetalertService } from '../../../../../../Services/sweetAlertService/sweetalert.service';
import { BrachService } from '../../../../../../Services/branchService/brach.service';
import { CountryService } from '../../../../../../Services/countryService/country.service';

export interface Country {
  id_t2_1_country:string;
  t2_1_country_name: string;
}
@Component({
  selector: 'app-add-branch',
  templateUrl: './add-branch.component.html',
  styleUrl: './add-branch.component.css'
})
export class AddBranchComponent {

  branchForm !: FormGroup;
  countries:any[]=[];
  divisionOnes:any[]=[];
  divisionTwo:any[]=[];
  divisionThree:any[]=[];
  showDivisionOne:boolean=false;
  showDivisionTwo:boolean=false;
  showDivisionThree:boolean=false;
  selectedCountry: any = null;  
  div1: string = '';
  div2: string = '';
  div3: string = '';
  @Output() closePopup = () => {};

  constructor(private router:Router,private fb: FormBuilder,private brachService:BrachService
    ,private sweetalert:SweetalertService,private countryService:CountryService 
    
  ){
      this.branchForm = this.fb.group({
        t2_company_branch_name: [''],
        t2_id_branch_type: [''],
        t2_email: [''],
        t2_mobile_no: [''],
        t2_phone_no: [''],
        t2_address_1: [''],
        t2_address_2: [''],
        id_t2_1_country: [''],
        id_t2_1_div1: [''],
        id_t2_1_div2: [''],
        id_t2_1_div3: [''],
        t2_1_local_name: [''],
        t2_zip_code: [''],
        t2_1_div1_called:[''],
      });}
  ngOnInit(): void {
    this.getCountry();
    
  }
  onClose() {
    this.closePopup();
    this.router.navigate(['/components/branch'])
  }

  onSubmit() :void{
    const data=this.branchForm.value;
    this.brachService.insertBranch(data).subscribe({
      next: (response) => {
      if(response.message=="Success"){
        this.sweetalert.showToast('success','Successfully created.');
        this.closePopup();
        this.branchForm.reset();
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
  getCountry():void{
    const filterCountries = {
      filters: {},
    };
    this.countryService.getCountry(filterCountries).subscribe({
      next: (res) => {
        if (res.status == 200) {
          this.countries = res.data.Items;
          console.log(this.countries);
          
        } else {
          console.log(res);
        }
      },
      error: (error) => {
        console.log(error);
        this.sweetalert.showToast('error', 'Oops!Something went wrong');
      },
    });
  }
  onCountryChange(countryId: string): void {
    // Find the selected country based on ID
   
    
  }

  onChangeDivisionone(event: Event): void {
    const selectElement = event.target as HTMLSelectElement; 
    const countryId= selectElement.value; 
    console.log(countryId);
    
  // this.getDivisionOneByCountryId(countryId);
  }
  
onChangeCountry(event:Event){
  this.showDivisionOne = false;
  this.showDivisionTwo = false;
  this.showDivisionThree = false;
  const selectElement = event.target as HTMLSelectElement; 
    const countryId= selectElement.value; 
  
  const filterCountries = {
    filters: {
      id_t2_1_country: countryId,
    },
  };
  this.selectedCountry = this.countries.find(c => c.id_t2_1_country === countryId);
  
  if (this.selectedCountry) {
    this.div1 = this.selectedCountry.t2_1_div1_called || ''; // Ensure empty string if null
    this.div2 = this.selectedCountry.t2_1_div2_called || '';
    this.div3 = this.selectedCountry.t2_1_div3_called || '';

    // Only show divisions if they are not empty
    this.showDivisionOne = !!this.div1; 
    this.showDivisionTwo = !!this.div2;
    this.showDivisionThree = !!this.div3;
  }
   
  
  this.countryService.getDivisionOneByCountryId(filterCountries).subscribe({
    next: (res) => {
      if (res.status == 200) {
        this.divisionOnes = res.data.Items ;
        
      } else {
        console.log(res);
      }
    },
    error: (error) => {
      console.log(error);
      this.sweetalert.showToast('error', 'Oops!Something went wrong');
    },
  });
}
onChangeDivisionOne(event:Event){
  const selectElement = event.target as HTMLSelectElement; 
  const divisionOneId= selectElement.value; 
  const filterCountries = {
    filters: {
      id_t2_1_div1: divisionOneId,
    },
  };
  this.countryService.getDivisionTwoByDivisionOneId(filterCountries).subscribe({
    next: (res) => {
      if (res.status == 200) {
        this.divisionTwo = res.data.Items ;
      } else {
        console.log(res);
      }
    },
    error: (error) => {
      console.log(error);
      this.sweetalert.showToast('error', 'Oops!Something went wrong');
    },
  });
}
onChangeDivisionTwo(event:Event){
  const selectElement = event.target as HTMLSelectElement; 
  const divisionTwoId= selectElement.value; 
  const filterCountries = {
    filters: {},
  };
  this.countryService.getDivisionThreeByDivisionTwoId(filterCountries).subscribe({
    next: (res) => {
      console.log(res);
      
      if (res.status == 200) {
        this.divisionThree = res.data.Items ;
        
      } else {
        console.log(res);
      }
    },
    error: (error) => {
      console.log(error);
      this.sweetalert.showToast('error', 'Oops!Something went wrong');
    },
  });
}
// getBranchType() {
//   const filterBranchType = {
//     filters: {
//       id_t4_selection: 'dbb3999e-36ba-4d63-827f-61e19cd698f9',
//     },
//   };
//   this.companyService.getSelectionType(filterBranchType).subscribe({
//     next: (res) => {
//       if (res.status == 200) {
//         this.branchType = res.data.Items;
//         console.log(this.branchType);
//       } else {
//         console.log(res);
//       }
//     },
//     error: (error) => {
//       console.log(error);
//       this.sweetalert.showToast('error', 'Oops!Something went wrong');
//     },
//   });
// }
}
