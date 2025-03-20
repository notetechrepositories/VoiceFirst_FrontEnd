import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BrachService } from '../../../../Services/branchService/brach.service';
import { SweetalertService } from '../../../../Services/sweetAlertService/sweetalert.service';
import { CountryService } from '../../../../Services/countryService/country.service';
import { UserService } from '../../../../Services/userService/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

    registerForm!:FormGroup
    showDivisionOne: boolean = false;
    showDivisionTwo: boolean = false;
    showDivisionThree: boolean = false;
    div1: string = '';
    div2: string = '';
    div3: string = '';
    countries: any[] = [];
    divisionOnes: any[] = [];
    divisionTwo: any[] = [];
    divisionThree: any[] = [];
    selectedCountry: any = null;
    constructor(
      private router: Router, private fb: FormBuilder, private brachService: BrachService,private userService:UserService
          , private sweetalert: SweetalertService, private countryService: CountryService
    ){}
    ngOnInit(): void {
     this.loginFormInit();
     this.getCountry();
  
    }
    loginFormInit(){
      this.registerForm = this.fb.group({
        t5_first_name: ['', [Validators.required,Validators.pattern(/^[A-Za-z\s]+$/)]],
        t5_last_name: ['',[Validators.pattern(/^[A-Za-z\s]+$/)]],
        t5_email: ['', [Validators.required,Validators.email]],
        t5_mobile_no: ['', [Validators.required,Validators.pattern(/^[0-9]{10}$/)]],
        t5_address_1: ['', [Validators.required]],
        t5_address_2: [''],
        t5_birth_year: [''],
        t5_sex: [''],
        t5_zip_code: [''],
        id_t2_1_country: [''],
        id_t2_1_div1: [''],
        id_t2_1_div2: [''],
        id_t2_1_div3: [''],
        t2_1_local_name: [''],
        id_t5_1_m_user_roles: [''],
        
      });
    }

    onRegister(){
      const data = this.registerForm.value;
      console.log("Form Data Sent:", data);
      this.registerForm.markAllAsTouched();
      this.userService.postUserDetails(data).subscribe({
        next: (response) => {
          console.log("API Response:", response); 
  
          if (response.status == 200) {
            this.sweetalert.showToast("success", "Successfully created.");
            this.router.navigate(['/authentication/login'])
            this.registerForm.reset();
          } else {
            this.sweetalert.showToast("error", response.message);
          }
        },
        error: (error) => {
          console.error("API Error:", error); // ✅ Check the actual error
          this.sweetalert.showToast("error", "Oops! Something went wrong.");
        }
      });
    }

    onSignIn(){
      
    }
    getCountry(): void {
      const filterCountries = {
        filters: {},
      };
      this.countryService.getCountry(filterCountries).subscribe({
        next: (res) => {
          if (res.status == 200) {
            this.countries = res.data.Items;
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
    onChangeCountry(event: Event) {
      this.showDivisionOne = false;
      this.showDivisionTwo = false;
      this.showDivisionThree = false;
  
      const selectElement = event.target as HTMLSelectElement;
      const countryId = selectElement.value;
      const filterCountries = {
        filters: {
          id_t2_1_country: countryId,
        },
      };
      this.selectedCountry = this.countries.find(c => c.id_t2_1_country === countryId);
      if (this.selectedCountry) {
        this.div1 = this.selectedCountry.t2_1_div1_called || '';
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
            this.divisionOnes = res.data.Items;
  
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
    onChangeDivisionOne(event: Event) {
      const selectElement = event.target as HTMLSelectElement;
      const divisionOneId = selectElement.value;
      const filterCountries = {
        filters: {
          id_t2_1_div1: divisionOneId,
        },
      };
      this.countryService.getDivisionTwoByDivisionOneId(filterCountries).subscribe({
        next: (res) => {
          if (res.status == 200) {
            this.divisionTwo = res.data.Items;
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
    onChangeDivisionTwo(event: Event) {
      const selectElement = event.target as HTMLSelectElement;
      const divisionTwoId = selectElement.value;
      const filterCountries = {
        filters: {
          id_t2_1_div2: divisionTwoId,
        },
      };
      this.countryService.getDivisionThreeByDivisionTwoId(filterCountries).subscribe({
        next: (res) => {
          console.log(res);
  
          if (res.status == 200) {
            this.divisionThree = res.data.Items;
  
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
}
