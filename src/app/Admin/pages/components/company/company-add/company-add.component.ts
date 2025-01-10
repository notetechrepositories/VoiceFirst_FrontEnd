import { Component, ComponentFactoryResolver, Output, ViewChild, ViewContainerRef, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Stepper from 'bs-stepper';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidationService } from '../../../../../Services/validationService/validation.service';
import { HttpClient } from '@angular/common/http';
import { CompanyService } from '../../../../../Services/companyService/company.service';
import { CountryService } from '../../../../../Services/countryService/country.service';
import { SweetalertService } from '../../../../../Services/sweetAlertService/sweetalert.service';



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
    this.formcompanyadd = this.fb.group({
      companyname: ['', [Validators.required]],
      companytype: ['', [Validators.required]],
      branchname: ['',[Validators.required]],
      branchtype: ['',[Validators.required]],
      branchemail: ['', [Validators.required, ValidationService.email]],
      branchmobile: ['', [Validators.required, ValidationService.phone]],
      branchphone: ['',[ValidationService.phone]],
      branchaddress: ['',[Validators.required]], 
      branchAddress2:['',[Validators.required]],
      branchCountry:['',[Validators.required]],
      branchDiv1:['',[Validators.required]],
      branchlocality: ['',[Validators.required]],
      useremail: ['', [Validators.required, ValidationService.email]],
    });
  }

  formcompanyadd!: FormGroup;
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

  ngOnInit(): void {
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

  next() {
    this.stepper.next();
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
    if (this.formcompanyadd.valid) {

      console.log('Form Submitted:', this.formcompanyadd.value);
    } else {
      console.log('Form is invalid. Please check the errors.');
      this.formcompanyadd.markAllAsTouched(); // Mark all controls as touched to trigger validation errors
    }

    
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
