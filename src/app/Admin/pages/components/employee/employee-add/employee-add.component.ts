import { Component, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ValidationService } from '../../../../../Services/validationService/validation.service';
import { CountryService } from '../../../../../Services/countryService/country.service';
import { SweetalertService } from '../../../../../Services/sweetAlertService/sweetalert.service';
import Swal from 'sweetalert2';
import { UserService } from '../../../../../Services/userService/user.service';
import { RoleService } from '../../../../../Services/roleService/role.service';

@Component({
  selector: 'app-employee-add',
  templateUrl: './employee-add.component.html',
  styleUrl: './employee-add.component.css'
})
export class EmployeeAddComponent implements OnInit{



  @Output() closePopup = () => {};

  formuseradd!: FormGroup;
  years:any[]=[];
  countries:any[]=[];
  roles:any[]=[];

  userDiv1:any[]=[];
  userDiv2:any[]=[];
  userDiv3:any[]=[];

  div1LabelUser!:string;
  div2LabelUser!:string;
  div3LabelUser!:string;

  showDivision1User:boolean=false;
  showDivision2User:boolean=false;
  showDivision3User:boolean=false;
  constructor(
    private router:Router,
    private fb:FormBuilder,
    private countryService:CountryService,
    private sweetalert:SweetalertService,
    private userService:UserService,
    private roleService:RoleService
  ){}
  
ngOnInit(): void {  
  this.initialise();
  this.getYears();
  // this.getEmployeeRoles();
  this.getCountries();
}
initialise(){
  this.formuseradd = this.fb.group({
    firstName: ['', [Validators.required, ValidationService.personName]],
    lastName: ['', [ValidationService.personName]],
    birthDate: [''],
    sex: [''],
    email: ['', [Validators.required, ValidationService.email]],
    mobile: ['', [Validators.required, ValidationService.phone]],
    address1: [''],
    address2: [''],
        id_t2_1_country: [''],
        id_t2_1_div1: [''],
        id_t2_1_div2: [''],
        id_t2_1_div3: [''],
    local: [''],
    zipCode: [''],
    id_t5_1_m_user_roles: [''],
      });
}

getEmployeeRoles(){
  const body={
   
  };
  this.roleService.getRole(body).subscribe({
    next: (res)=>{
      if(res.status==200){
        console.log("roles get:",res.data.Items);
        
        this.roles=res.data.Items;
        console.log("roles are:",this.roles);
        
      }else{
        console.log(res);
      }
    },
    error:(error)=>{
      console.log(error);
      this.sweetalert.showToast('error', 'Oops!Something went wrong');
    }
  })
}

getYears() {
  const currentYear = new Date().getFullYear();
  const startYear = currentYear - 130; // The oldest allowed year of birth (130 years ago)
  const endYear = currentYear - 18; // The youngest allowed year of birth (18 years ago)

  // Generate the range of years
  this.years = Array.from(
    { length: endYear - startYear + 1 },
    (_, i) => startYear + i
  );
}

getCountries() {
  const filterCountries = {
    filters: {},
  };
  this.countryService.getCountry(filterCountries).subscribe({
    next: (res) => {
      if (res.status == 200) {
        this.countries = res.data.Items;
        console.log('getCountries result', this.countries);
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

onChangeUserCountry(event: Event) {
  this.formuseradd.controls['id_t2_1_div1'].reset();
  this.formuseradd.controls['id_t2_1_div2'].reset();
  this.formuseradd.controls['id_t2_1_div3'].reset();
  const eventValue = event.target as HTMLSelectElement;
  const id = eventValue.value;
  const selectedCountry = this.countries.find(
    (country) => country.id_t2_1_country === id
  );
  if (selectedCountry.t2_1_div1_called) {
    this.div1LabelUser = selectedCountry.t2_1_div1_called;
    this.showDivision1User = true;
    this.formuseradd.controls['id_t2_1_div1'].setValidators(
      Validators.required
    );
    this.formuseradd.controls['id_t2_1_div1'].updateValueAndValidity();
  } else {
    this.showDivision1User = false;
    this.formuseradd.controls['id_t2_1_div1'].clearValidators();
    this.formuseradd.controls['id_t2_1_div1'].updateValueAndValidity();
    this.formuseradd.controls['id_t2_1_div1'].setValue('');
    this.formuseradd.controls['id_t2_1_div2'].clearValidators();
    this.formuseradd.controls['id_t2_1_div2'].updateValueAndValidity();
    this.formuseradd.controls['id_t2_1_div2'].setValue('');
    this.formuseradd.controls['id_t2_1_div3'].clearValidators();
    this.formuseradd.controls['id_t2_1_div3'].updateValueAndValidity();
    this.formuseradd.controls['id_t2_1_div3'].setValue('');
  }
  if (selectedCountry.t2_1_div2_called) {
    this.div2LabelUser = selectedCountry.t2_1_div2_called;
    this.showDivision2User = true;
    this.formuseradd.controls['id_t2_1_div2'].setValidators(
      Validators.required
    );
    this.formuseradd.controls['id_t2_1_div2'].updateValueAndValidity();
  } else {
    this.showDivision2User = false;
    this.formuseradd.controls['id_t2_1_div2'].clearValidators();
    this.formuseradd.controls['id_t2_1_div2'].updateValueAndValidity();
    this.formuseradd.controls['id_t2_1_div2'].setValue('');
    this.formuseradd.controls['id_t2_1_div3'].clearValidators();
    this.formuseradd.controls['id_t2_1_div3'].updateValueAndValidity();
    this.formuseradd.controls['id_t2_1_div3'].setValue('');
  }
  if (selectedCountry.t2_1_div3_called) {
    this.div3LabelUser = selectedCountry.t2_1_div3_called;
    this.showDivision3User = true;
    this.formuseradd.controls['id_t2_1_div3'].setValidators(
      Validators.required
    );
    this.formuseradd.controls['id_t2_1_div3'].updateValueAndValidity();
  } else {
    this.showDivision3User = false;
    this.formuseradd.controls['id_t2_1_div3'].clearValidators();
    this.formuseradd.controls['id_t2_1_div3'].updateValueAndValidity();
    this.formuseradd.controls['id_t2_1_div3'].setValue('');
  }
  console.log('country is', selectedCountry.t2_1_div1_called);
  const filterDiv1 = {
    filters: {
      id_t2_1_country: id,
    },
  };
  this.countryService.getDivisionOneByCountryId(filterDiv1).subscribe({
    next: (res) => {
      if (res.status == 200) {
        this.userDiv1 = res.data.Items;
        console.log(this.userDiv1);
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

onChangeUserDivision1(event: Event) {
  const eventValue = event.target as HTMLSelectElement;
  const id = eventValue.value;
  const filterDiv2 = {
    filters: {
      id_t2_1_div1: id,
    },
  };
  this.countryService.getDivisionTwoByDivisionOneId(filterDiv2).subscribe({
    next: (res) => {
      if (res.status == 200) {
        this.userDiv2 = res.data.Items;
        console.log(this.userDiv2);
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

onChangeUserDivision2(event: Event) {
  const eventValue = event.target as HTMLSelectElement;
  const id = eventValue.value;
  const filterDiv3 = {
    filters: {
      id_t2_1_div2: id,
    },
  };
  this.countryService.getDivisionThree(filterDiv3).subscribe({
    next: (res) => {
      if (res.status == 200) {
        this.userDiv3 = res.data.Items;
        console.log(this.userDiv3);
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

onSubmit(): void {
    
    console.log('Form formuseradd:', this.formuseradd.value);

    this.formuseradd.markAllAsTouched();
    if (this.formuseradd.valid ) {
      const requestData = {
        
        userDtoModel: {
          t5_first_name: this.formuseradd.get('t5_first_name')?.value,
          t5_last_name: this.formuseradd.get('t5_last_name')?.value,
          t5_address_1: this.formuseradd.get('t5_address_1')?.value,
          t5_address_2: this.formuseradd.get('t5_address_2')?.value,
          t5_zip_code: this.formuseradd.get('t5_zip_code')?.value,
          t5_mobile_no: this.formuseradd.get('t5_mobile_no')?.value,
          t5_email: this.formuseradd.get('t5_email')?.value,
          t5_birth_year: this.formuseradd.get('t5_birth_year')?.value,
          t5_sex: this.formuseradd.get('t5_sex')?.value,
          id_t5_1_m_user_roles: this.formuseradd.get('id_t5_1_m_user_roles')?.value,
          id_t2_1_country: this.formuseradd.get('id_t2_1_country')?.value,
          id_t2_1_div1: this.formuseradd.get('id_t2_1_div1')?.value,
          id_t2_1_div2: this.formuseradd.get('id_t2_1_div2')?.value,
          id_t2_1_div3: this.formuseradd.get('id_t2_1_div3')?.value,
          t2_1_local_name: this.formuseradd.get('t2_1_local_name')?.value,
        },
      };
      Swal.fire({
        title: 'Are you sure?',
        text: 'This action will add a new company',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, add company!'
      }).then((result) => {
        if (result.isConfirmed) {
          // Execute your function here when the user clicks "Yes"
          this.userService.postUserDetails(requestData).subscribe({
            next: (res) => {
              if (res.status == 200) {
                Swal.fire({
                  icon: 'success',
                  title: 'Success!',
                  text: 'Company added successfully.',
                  toast: true,
                  position: 'top-end',
                  showConfirmButton: false,
                  timer: 3000,
                  timerProgressBar: true
                });
                this.onClose()
              } else {
                Swal.fire({
                  icon: 'error',
                  title:'Not inserted',
                  text:res.message,
                  toast: true,
                  position: 'top-end',
                  showConfirmButton: false,
                  timer: 3000,
                  timerProgressBar: true
                });
                
              }
            },
            
          });
        }
      });
      

      // Combine the form data into a single object
      // const requestData = {
      //   t1_company_name: this.formcompanyadd.value.t1_company_name,
      //   id_company_type: this.formcompanyadd.value.id_company_type,
      //   insertBranchDTOModel: this.formbranchadd.value,
      //   userDtoModel: this.formuseradd.value,
      // };

      

      console.log('Combined Data:', requestData);
      
    }

   
  }
onClose() {
  this.closePopup();
  this.router.navigate(['/components/employee']);
}

onSave() {
  alert('Employee Added!');
  this.closePopup();
}
}
