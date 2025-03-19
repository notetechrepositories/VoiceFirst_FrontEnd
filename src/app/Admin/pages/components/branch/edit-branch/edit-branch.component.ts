import { Component, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { BrachService } from '../../../../../Services/branchService/brach.service';
import { CountryService } from '../../../../../Services/countryService/country.service';
import { SweetalertService } from '../../../../../Services/sweetAlertService/sweetalert.service';
import { CompanyService } from '../../../../../Services/companyService/company.service';

@Component({
  selector: 'app-edit-branch',
  templateUrl: './edit-branch.component.html',
  styleUrl: './edit-branch.component.css'
})
export class EditBranchComponent {
  @Output() closePopup = () => {};
  @Input() branchData: any;
  branchForm !: FormGroup;
  countries:any[]=[];
  divisionOnes:any[]=[];
  divisionTwo:any[]=[];
  divisionThree:any[]=[];
  branchType: any[] = [];
  showDivisionOne:boolean=false;
  showDivisionTwo:boolean=false;
  showDivisionThree:boolean=false;
  selectedCountry: any = null;  
  div1: string = '';
  div2: string = '';
  div3: string = '';
  constructor(private router:Router,private fb: FormBuilder,private brachService:BrachService
      ,private sweetalert:SweetalertService,private countryService:CountryService ,private companyService:CompanyService)
      {this.branchForm = this.fb.group({
        id_t2_company_branch:[''],
        t2_company_branch_name: [''],
        id_t1_company: ['8bd712f1-222f-4322-a496-56bdd9e4e03b'],
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
        id_t2_1_local:[''],
        t2_1_local_name: [''],
        t2_zip_code: ['']
      
      });}
      async ngOnInit(): Promise<void> {
        await this.getBranchType();
        await this.getCountry();


        
      }
  onClose() {
    this.closePopup();
    this.router.navigate(['/company/branch'])
  }

  onSubmit() {
    const data=this.branchForm.value;
    this.brachService.updateBranch(data).subscribe({
      next: (response) => {
        if(response.message=="Success"){
          this.sweetalert.showToast('success','Successfully updated.');
          this.closePopup();
          this.branchForm.reset();
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
  getCountry():void{
    const filterCountries = {
      filters: {},
    }; 
    this.countryService.getCountry(filterCountries).subscribe({
      next: async (res) => {
        if (res.status == 200) {
          this.countries = res.data.Items;
          await this.getData();
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

  onChangeCountry(event:Event){
   

    const selectElement = event.target as HTMLSelectElement; 
    const countryId= selectElement.value;
    this.getDivisionOne(countryId);
 
  }
  getDivisionOne(countryId:string){
    console.log(countryId);
    
    const filterCountries = {
      filters: {
        id_t2_1_country: countryId,
      },
    };
    console.log(this.countries);
    
    this.selectedCountry = this.countries.find(c => c.id_t2_1_country === countryId);
    console.log(this.selectedCountry);
    
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

   this.getdivisiontwo(divisionOneId);
  }
  getdivisiontwo(divisionOneId:string){
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
   this.getDivisionThree(divisionTwoId);
  }
  getDivisionThree(divisionTwoId:string){
    const filterCountries = {
      filters: {
        id_t2_1_div2: divisionTwoId,
      },
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
  getBranchType() {
    const filterBranchType = {
      filters: {
        id_t4_selection: 'dbb3999e-36ba-4d63-827f-61e19cd698f9',
      },
    };
    this.companyService.getSelectionType(filterBranchType).subscribe({
      next: (res) => {
        console.log(res);
        
        if (res.status == 200) {
          this.branchType = res.data.Items;
          

          console.log(this.branchType);
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
  getData(){
    console.log(this.branchData);
    
    if (this.branchData) {
      console.log(this.branchData.id_t2_1_country);
      
      this.getDivisionOne(this.branchData.id_t2_1_country);
      this.getdivisiontwo(this.branchData.id_t2_1_div1) 
      this.getDivisionThree(this.branchData.id_t2_1_div2)
      const data=this.branchData;
      this.branchForm.patchValue({
        id_t2_company_branch:data.id_t2_company_branch,
        t2_company_branch_name: data.t2_company_branch_name,
        t2_id_branch_type:data.t2_id_branch_type,
        t2_1_div1_called: data.t2_1_div1_called,
        t2_1_div2_called: data.t2_1_div2_called,
        t2_1_div3_called: data.t2_1_div3_called,
        id_t2_1_country:data.id_t2_1_country,
        company_branch_type_name:data.company_branch_type_name,
        t2_email:data.t2_email,
        t2_address_1:data.t2_address_1,
        t2_address_2:data.t2_address_2,
        t2_mobile_no:data.t2_mobile_no,
        t2_phone_no:data.t2_phone_no,
        t2_1_local_name:data.t2_1_local_name,
        t2_zip_code:data.t2_zip_code,
        t2_1_country_name:data.t2_1_country_name,
        id_t2_1_div1:data.id_t2_1_div1,
        id_t2_1_div2:data.id_t2_1_div2,
        id_t2_1_div3:data.id_t2_1_div3,
        t2_1_div2_name:data.t2_1_div2_name,
      });
    }
  }
}
     