import {
  Component,
  ComponentFactoryResolver,
  Output,
  ViewChild,
  ViewContainerRef,
  OnInit,
} from '@angular/core';
import { Router } from '@angular/router';
import Stepper from 'bs-stepper';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidationService } from '../../../../../Services/validationService/validation.service';
import { HttpClient } from '@angular/common/http';
import { CompanyService } from '../../../../../Services/companyService/company.service';
import { CountryService } from '../../../../../Services/countryService/country.service';
import { SweetalertService } from '../../../../../Services/sweetAlertService/sweetalert.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-company-add',
  templateUrl: './company-add.component.html',
  styleUrl: './company-add.component.css',
})
export class CompanyAddComponent implements OnInit {
  @Output() closePopup = () => { };

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private http: HttpClient,
    private companyService: CompanyService,
    private countryService: CountryService,
    private sweetalert: SweetalertService
  ) { }

  formcompanyadd!: FormGroup;
  formbranchadd!: FormGroup;
  formuseradd!: FormGroup;

  companyType: any[] = [];
  branchType: any[] = [];
  countries: any[] = [];
  div1: any[] = [];
  div2: any[] = [];
  div3: any[] = [];
  userDiv1: any[] = [];
  userDiv2: any[] = [];
  userDiv3: any[] = [];
  years: number[] = [];
  selectedType!: string;

  currentStep: number = 1;

  showDivision1: boolean = false;
  showDivision2: boolean = false;
  showDivision3: boolean = false;
  showDivision1User: boolean = false;
  showDivision2User: boolean = false;
  showDivision3User: boolean = false;
  div1Label: string = 'Division1';
  div2Label: string = 'Division2';
  div3Label: string = 'Division2';
  div1LabelUser: string = 'Division';
  div2LabelUser: string = 'Division';
  div3LabelUser: string = 'Division';
  ngOnInit(): void {
    this.stepperFn();
    this.getCompanyType();
    this.getCountries();
    this.initializeForm();
    this.getYears();
  }

  private stepper!: Stepper;
  initializeForm() {
    console.log('Form initialized');
    this.formcompanyadd = this.fb.group({
      t1_company_name: ['', [Validators.required]],
      id_company_type: ['', [Validators.required]],
      company_type: [''],
    });
    this.formbranchadd = this.fb.group({
      t2_company_branch_name: ['', [Validators.required]],
      t2_email: ['', [Validators.required, ValidationService.email]],
      t2_mobile_no: ['', [Validators.required, ValidationService.phone]],
      t2_phone_no: ['', [ValidationService.phone]],
      t2_address_1: ['', [Validators.required]],
      t2_address_2: [''],
      id_t2_1_country: ['', [Validators.required]],
      id_t2_1_div1: ['', [Validators.required]],
      id_t2_1_div2: [''],
      id_t2_1_div3: ['',],
      t2_1_local_name: ['', [Validators.required]],
      t2_zip_code: ['', [Validators.required]],
    });
    this.formuseradd = this.fb.group({
      t5_first_name: ['', [Validators.required, ValidationService.personName]],
      t5_last_name: ['', [Validators.required, ValidationService.personName]],
      t5_birth_year: [''],
      t5_sex: [''],
      t5_email: ['', [Validators.required, ValidationService.email]],
      t5_mobile_no: ['', [Validators.required, ValidationService.phone]],
      t5_address_1: ['', [Validators.required]],
      t5_address_2: [''],
      id_t2_1_country: ['', [Validators.required]],
      id_t2_1_div1: [''],
      id_t2_1_div2: [''],
      id_t2_1_div3: [''],
      t2_1_local_name: ['', [Validators.required]],
      t5_zip_code: ['', [Validators.required]]
    });
  }
  showOtherCompanyType: boolean = false;

  onCompanyTypeChange(event: any) {
    const selectedValue = event.target.value;
    this.showOtherCompanyType = selectedValue === 'other';

    // Optional: clear or set validation for "other_company_type"
    if (this.showOtherCompanyType) {
      this.formcompanyadd.get('company_type')?.setValidators([Validators.required]);
    } else {
      this.formcompanyadd.get('company_type')?.clearValidators();
      this.formcompanyadd.get('company_type')?.setValue('');
    }

    this.formcompanyadd.get('company_type')?.updateValueAndValidity();
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

  stepperFn() {
    const stepperElement = document.querySelector('#stepper1');
    if (stepperElement) {
      this.stepper = new Stepper(stepperElement, {
        linear: false,
        animation: true,
      });
    } else {
      console.error('Stepper element not found!');
    }
  }

  nexttobranch() {
    this.formcompanyadd.markAllAsTouched();
    if (this.formcompanyadd.valid && this.currentStep < 3) {
      this.stepper.next();
      this.currentStep++;
    }
  }
  nexttouser() {
    console.log(' Just Entered to nextToUser');
    this.formbranchadd.markAllAsTouched();
    if (this.formbranchadd.valid && this.currentStep < 3) {
      this.stepper.next();
      this.currentStep++;
    }
    else {
      console.log('this.formbranchadd.valid', this.formbranchadd.valid);
      console.log('this.currentStep < 3', this.currentStep < 3);
    }
  }
  previoustocompany() {
    if (this.formcompanyadd.valid && this.currentStep > 1) {
      this.stepper.previous();
      this.currentStep--;
    }
  }

  previoustobranch() {
    if (this.formbranchadd.valid && this.currentStep > 1) {
      this.stepper.previous();
      this.currentStep--;
    }
  }

  isCurrentStep(step: number): boolean {
    return this.currentStep === step;
  }

  getCompanyType() {

    this.companyService.getCompanyType().subscribe({
      next: (res) => {
        if (res.status == 200) {
          this.companyType = res.data.Items;
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
  onChangeCountries(event: Event) {
    this.formbranchadd.controls['id_t2_1_div1'].reset();
    this.formbranchadd.controls['id_t2_1_div2'].reset();
    this.formbranchadd.controls['id_t2_1_div3'].reset();
    const eventValue = event.target as HTMLSelectElement;
    const id = eventValue.value;
    console.log(id);

    const selectedCountry = this.countries.find(
      (country) => country.id_t2_1_country === id
    );
    if (selectedCountry.t2_1_div1_called) {
      this.div1Label = selectedCountry.t2_1_div1_called;
      this.showDivision1 = true;
      this.formbranchadd.controls['id_t2_1_div1'].setValidators(
        Validators.required
      );
      this.formbranchadd.controls['id_t2_1_div1'].updateValueAndValidity();
    } else {
      this.showDivision1 = false;
      this.formbranchadd.controls['id_t2_1_div1'].clearValidators();
      this.formbranchadd.controls['id_t2_1_div1'].updateValueAndValidity();
      this.formbranchadd.controls['id_t2_1_div1'].setValue('');
      this.formbranchadd.controls['id_t2_1_div2'].clearValidators();
      this.formbranchadd.controls['id_t2_1_div2'].updateValueAndValidity();
      this.formbranchadd.controls['id_t2_1_div2'].setValue('');
      this.formbranchadd.controls['id_t2_1_div3'].clearValidators();
      this.formbranchadd.controls['id_t2_1_div3'].updateValueAndValidity();
      this.formbranchadd.controls['id_t2_1_div3'].setValue('');
    }
    if (selectedCountry.t2_1_div2_called) {
      this.div2Label = selectedCountry.t2_1_div2_called;
      this.showDivision2 = true;
      this.formbranchadd.controls['id_t2_1_div2'].setValidators(
        Validators.required
      );
      this.formbranchadd.controls['id_t2_1_div2'].updateValueAndValidity();
    } else {
      this.showDivision2 = false;
      this.formbranchadd.controls['id_t2_1_div2'].clearValidators();
      this.formbranchadd.controls['id_t2_1_div2'].updateValueAndValidity();
      this.formbranchadd.controls['id_t2_1_div2'].setValue('');
      this.formbranchadd.controls['id_t2_1_div3'].clearValidators();
      this.formbranchadd.controls['id_t2_1_div3'].updateValueAndValidity();
      this.formbranchadd.controls['id_t2_1_div3'].setValue('');
    }
    if (selectedCountry.t2_1_div3_called) {
      this.div3Label = selectedCountry.t2_1_div3_called;
      this.showDivision3 = true;
      this.formbranchadd.controls['id_t2_1_div3'].setValidators(
        Validators.required
      );
      this.formbranchadd.controls['id_t2_1_div3'].updateValueAndValidity();
    } else {
      this.showDivision3 = false;
      this.formbranchadd.controls['id_t2_1_div3'].clearValidators();
      this.formbranchadd.controls['id_t2_1_div3'].updateValueAndValidity();
      this.formbranchadd.controls['id_t2_1_div3'].setValue('');
    }
    console.log('country is', selectedCountry.t2_1_div1_called);

    const filterDiv1 = {
      filters: {
        id_t2_1_country: id,
      },
    };
    console.log(id);
    this.countryService.getDivisionOneByCountryId(filterDiv1).subscribe({
      next: (res) => {
        if (res.status == 200) {
          console.log(res);

          this.div1 = res.data.Items;
          console.log('onChangeCountries result', this.div1);
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
  onChangeDivision1(event: Event) {
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
          this.div2 = res.data.Items;
          console.log(this.div2);
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

  onChangeDivision2(event: Event) {
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
          this.div3 = res.data.Items;
          console.log(this.div3);
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
    console.log(id);

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
    console.log(id);
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
  // markAllExceptExcluded() {
  //   const excludedControls = ['id_t2_1_div1', 'id_t2_1_div2', 'id_t2_1_div3']; // Controls to exclude
  //   Object.keys(this.formbranchadd.controls).forEach((controlName) => {
  //     if (!excludedControls.includes(controlName)) {
  //       this.formbranchadd.controls[controlName].markAsTouched();
  //     }
  //   });
  // }

  onSubmit(): void {


    this.formuseradd.markAllAsTouched();
    if (
      this.formcompanyadd.valid &&
      this.formbranchadd.valid &&
      this.formuseradd.valid

    ) {
      const requestData = {
        t1_company_name: this.formcompanyadd.get('t1_company_name')?.value,
        id_company_type: this.formcompanyadd.get('id_company_type')?.value,
        company_type: this.formcompanyadd.get('company_type')?.value,
        insertBranchDTOModel: {
          t2_company_branch_name: this.formbranchadd.get('t2_company_branch_name')?.value,
          t2_address_1: this.formbranchadd.get('t2_address_1')?.value,
          t2_address_2: this.formbranchadd.get('t2_address_2')?.value,
          t2_zip_code: this.formbranchadd.get('t2_zip_code')?.value,
          t2_mobile_no: this.formbranchadd.get('t2_mobile_no')?.value,
          t2_phone_no: this.formbranchadd.get('t2_phone_no')?.value,
          t2_email: this.formbranchadd.get('t2_email')?.value,
          id_t2_1_country: this.formbranchadd.get('id_t2_1_country')?.value,
          id_t2_1_div1: this.formbranchadd.get('id_t2_1_div1')?.value,
          id_t2_1_div2: this.formbranchadd.get('id_t2_1_div2')?.value,
          id_t2_1_div3: this.formbranchadd.get('id_t2_1_div3')?.value,
          t2_1_local_name: this.formbranchadd.get('t2_1_local_name')?.value,
        },
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
      console.log(requestData);

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
          this.companyService.registerCompany(requestData).subscribe({
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
                  title: 'Not inserted',
                  text: res.message,
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
    this.router.navigate(['/company']);
  }

  onSave() {
    alert('Company Added!');
    this.closePopup();
  }
}
