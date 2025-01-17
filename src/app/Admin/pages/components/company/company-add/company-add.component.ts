import { Component, ComponentFactoryResolver, Output, ViewChild, ViewContainerRef, OnInit } from '@angular/core';
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
  styleUrl: './company-add.component.css'
})
export class CompanyAddComponent implements OnInit{


  
  @Output() closePopup = () => {};

  constructor(
    private router:Router, 
    private fb: FormBuilder, 
    private http: HttpClient,
    private companyService:CompanyService,
    private countryService: CountryService,
    private sweetalert:SweetalertService
    )
  {
    
  }

  formcompanyadd!: FormGroup;
  formbranchadd!: FormGroup;
  formuseradd!: FormGroup;

  companyType: any[]=[];
  branchType: any[]=[];
  countries: any[]=[];
  div1: any[]=[];
  div2: any[]=[];
  div3: any[]=[];
  userDiv1: any[]=[];
  userDiv2: any[]=[];
  userDiv3: any[]=[];
  selectedType!: string;
  showDiv1:boolean=false;
  div1Called!: string;
  currentStep: number=1;
  showDivision1: boolean=false;
  showDivision2: boolean=false;
  showDivision3: boolean=false;
  ngOnInit(): void {
    this.formcompanyadd = this.fb.group({
      t1_company_name: ['', [Validators.required]],
      id_company_type: ['', [Validators.required]],
    
    });
    this.formbranchadd = this.fb.group({
      t2_company_branch_name: ['',[Validators.required]],
      t2_id_branch_type: ['',[Validators.required]],
      t2_email: ['', [Validators.required, ValidationService.email]],
      t2_mobile_no: ['', [Validators.required, ValidationService.phone]],
      t2_phone_no: ['',[ValidationService.phone]],
      t2_address_1: ['',[Validators.required]], 
      t2_address_2:['',[Validators.required]],
      id_t2_1_country:['',[Validators.required]],
      id_t2_1_div1:['',[Validators.required]],
      id_t2_1_div2:[''],
      id_t2_1_div3:[''],
      t2_1_local_name: ['',[Validators.required]],
      t2_zip_code:['',[Validators.required]],
      
    });
    this.formuseradd = this.fb.group({
      t5_first_name:[''],
      t5_last_name:[''],
      t5_birth_year:[''],
      t5_sex:[''],
      t5_email: ['', [Validators.required, ValidationService.email]],
      t5_mobile_no:[''],
      t5_address_1:[''],
      t5_address_2:[''],
      id_t2_1_country:[''],
      id_t2_1_div1:[''],
      id_t2_1_div2:[''],
      id_t2_1_div3:[''],
      t2_1_local_name:[''],
      t5_zip_code:[''],
      
    });
   this.stepperFn();
   this.getCompanyType();
   this.getBranchType();
   this.getCountries();
  }




  private stepper!: Stepper;

  stepperFn(){
    const stepperElement = document.querySelector('#stepper1');
    if (stepperElement) {
      this.stepper = new Stepper(stepperElement, {
        linear: false,
        animation: true
      });
    } else {
      console.error("Stepper element not found!");
    }
  }

  nexttobranch() {
    this.formcompanyadd.markAllAsTouched();
    if(this.formcompanyadd.valid && this.currentStep < 3)
    {
      this.stepper.next();
      this.currentStep++;
    }
  }
  nexttouser(){
    this.formbranchadd.markAllAsTouched();
    if(this.formbranchadd.valid && this.currentStep < 3)
    {
      this.stepper.next();
      this.currentStep++;
    }
  }

  isCurrentStep(step: number): boolean {
    return this.currentStep === step;
  }

  getCompanyType(){
    const filterCompanyType = { 
      filters: { 
        id_t4_selection: "43E256AF-AC0F-4A89-AE2C-B0EAB8860C61"
      }
    }; 

    this.companyService.getSelectionType(filterCompanyType).subscribe({
      next:res=>{
        if(res.status==200){
          this.companyType=res.data.Items; 
        }
        else{
          console.log(res);  
        }
        
      },
      error:error=>{
        console.log(error);
        this.sweetalert.showToast('error','Oops!Something went wrong')
      }
    })
  }

  getBranchType(){
    const filterBranchType = { 
      filters: { 
        id_t4_selection: "dbb3999e-36ba-4d63-827f-61e19cd698f9" ,
      }
    }; 
    this.companyService.getSelectionType(filterBranchType).subscribe({
      next:res=>{
        if(res.status==200){
          this.branchType=res.data.Items;
          console.log(this.branchType); 
        }
        else{
          console.log(res);
        }
        
      },
      error:error=>{
        console.log(error);
        this.sweetalert.showToast('error','Oops!Something went wrong')
      } 
      
    })
  }
  getCountries(){
    const filterCountries = { 
      filters: { 
        
      }
    };
    this.countryService.getCountry(filterCountries).subscribe({
      next: res=>{
        if(res.status==200){
          this.countries=res.data.Items;
          console.log("getCountries result",this.countries);
          
           

        }
        else{
          console.log(res);
        }
      },
      error:error=>{
        console.log(error);
        this.sweetalert.showToast('error','Oops!Something went wrong')
      }
    })
  }
  onChangeCountries(event: Event){
    
    const eventValue=event.target as HTMLSelectElement;
    const id=eventValue.value;
    const filterDiv1 = { 
      filters: { 
        id_t2_1_country:id
      }
    };
    
    this.countryService.getDivisionOneByCountryId(filterDiv1).subscribe({
      next: res=>{
        if(res.status==200){
          
          
          this.div1=res.data.Items
          console.log("onChangeCountries result",this.div1);
          
           
          
        }
        else{
          console.log(res);
        }
      },
      error:error=>{
        console.log(error);
        this.sweetalert.showToast('error','Oops!Something went wrong')
      }
    })
  }
  onChangeDivision1(event: Event){
    const eventValue=event.target as HTMLSelectElement;
    const id=eventValue.value;
    const filterDiv2 = { 
      filters: { 
        id_t2_1_div1:id
      }
    };
    this.countryService.getDivisionTwoByDivisionOneId(filterDiv2).subscribe({
      next: res=>{
        if(res.status==200){
          this.div2=res.data.Items
          console.log(this.div2); 
        }
        else{
          console.log(res);
        }
      },
      error:error=>{
        console.log(error);
        this.sweetalert.showToast('error','Oops!Something went wrong')
      }
    })
  }
   
  onChangeDivision2(event: Event){

    const eventValue=event.target as HTMLSelectElement;
    const id=eventValue.value;
    const filterDiv3 = { 
      filters: { 
        id_t2_1_div2:id
      }
    };
    this.countryService.getDivisionThree(filterDiv3).subscribe({
      next: res=>{
        if(res.status==200){
          this.div3=res.data.Items
          console.log(this.div3); 
        }
        else{
          console.log(res);
        }
      },
      error:error=>{
        console.log(error);
        this.sweetalert.showToast('error','Oops!Something went wrong')
      }
    })
  }
  onChangeUserCountry(event: Event){
    const eventValue=event.target as HTMLSelectElement;
    const id=eventValue.value;
    const filterDiv1 = { 
      filters: { 
        id_t2_1_country:id
      }
    };
    this.countryService.getDivisionOneByCountryId(filterDiv1).subscribe({
      next: res=>{
        if(res.status==200){
          this.userDiv1=res.data.Items
          console.log(this.userDiv1); 
        }
        else{
          console.log(res);
        }
      },
      error:error=>{
        console.log(error);
        this.sweetalert.showToast('error','Oops!Something went wrong')
      }
    })
  }
  onChangeUserDivision1(event: Event){
    const eventValue=event.target as HTMLSelectElement;
    const id=eventValue.value;
    const filterDiv2 = { 
      filters: { 
        id_t2_1_div1:id
      }
    };
    this.countryService.getDivisionTwoByDivisionOneId(filterDiv2).subscribe({
      next: res=>{
        if(res.status==200){
          this.userDiv2=res.data.Items
          console.log(this.userDiv2); 
        }
        else{
          console.log(res);
        }
      },
      error:error=>{
        console.log(error);
        this.sweetalert.showToast('error','Oops!Something went wrong')
      }
    })
  }
  onChangeUserDivision2(event: Event){
    const eventValue=event.target as HTMLSelectElement;
    const id=eventValue.value;
    const filterDiv3 = { 
      filters: { 
        id_t2_1_div2:id
      }
    };
    this.countryService.getDivisionThree(filterDiv3).subscribe({
      next: res=>{
        if(res.status==200){
          this.userDiv3=res.data.Items
          console.log(this.userDiv3); 
        }
        else{
          console.log(res);
        }
      },
      error:error=>{
        console.log(error);
        this.sweetalert.showToast('error','Oops!Something went wrong')
      }
    })
  }


  
  onSubmit(): void {
    console.log('Form formcompanyadd:', this.formcompanyadd.value);
    console.log('Form formbranchadd:', this.formbranchadd.value);
    console.log('Form formuseradd:', this.formuseradd.value);

    this.formuseradd.markAllAsTouched();
    if (this.formcompanyadd.valid && this.formbranchadd && this.formuseradd && this.currentStep <=3)
   {
    
    
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, add company!"
      })
    
    
      // Combine the form data into a single object
      const requestData = {
        t1_company_name: this.formcompanyadd.get('t1_company_name')?.value,
        id_company_type: this.formcompanyadd.get('id_company_type')?.value,
        insertBranchDTOModel: this.formbranchadd.value,
        userDtoModel: this.formuseradd.value,
      };
      
      console.log('Combined Data:', requestData);
      this.companyService.registerCompany(requestData).subscribe({
         next:res=>{
          if(res.status==200){
            
            console.log("success"); 
          }
          else{
            console.log(res);
          }
        },
        error:error=>{
          console.log(error);
        this.sweetalert.showToast('error','Oops!Something went wrong')
        }
        
      })

    }
  



    // if (this.formcompanyadd.valid) {

    //   console.log('Form Submitted:', this.formcompanyadd.value);
    // } else {
    //   console.log('Form is invalid. Please check the errors.');
    //   this.formcompanyadd.markAllAsTouched(); // Mark all controls as touched to trigger validation errors
    // }

    
  }

  // Helper method to check if a control has a specific error
  // hasError(controlName: string, errorName: string): boolean {
  //   return this.formcompanyadd.get(controlName)?.hasError(errorName) ?? false;
  // }
  

  



  onClose() {
    
    this.closePopup();
    this.router.navigate(['/components/company'])
    
  }

  onSave() {
    alert('Company Added!');
    this.closePopup();
  }
}
