import { Component, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { ValidationService } from '../../../../../Services/validationService/validation.service';

@Component({
  selector: 'app-company-view',
  templateUrl: './company-view.component.html',
  styleUrl: './company-view.component.css'
})
export class CompanyViewComponent implements OnInit{
  // @Input() company: any;
  
  company: any;
  formcompany!: FormGroup;
  formbranch!: FormGroup;
  formheadoffice!: FormGroup
  constructor(private router: Router, private fb: FormBuilder) {}

  ngOnInit(): void {

    // Retrieve the company object using history.state
    this.company = history.state.company;
    console.log('Received company:', this.company); // Debugging

    // If company is undefined (direct access), redirect or show a message
    if (!this.company) {
      console.warn('Company data missing, handle accordingly.');
    }

    this.initialiseForm();
    this.fetchCompanyData();
    
  }
  
initialiseForm(){
  console.log("initialised");
  

  this.formheadoffice = this.fb.group({  // Separate FormGroup for Head Office
    t2_company_branch_name: ['', [Validators.required]],
    t2_email: ['', [Validators.required, ValidationService.email]],
    t2_mobile_no: ['', [Validators.required, ValidationService.phone]],
    t2_phone_no: ['', [ValidationService.phone]],
    t2_address_1: ['', [Validators.required]],
    t2_address_2: [''],
    t2_zip_code: ['', [Validators.required]],
    t2_1_local_name: ['', [Validators.required]],
    t2_1_div3_name: [''],
    t2_1_div2_name: [''],
    t2_1_div1_name: [''],
    t2_1_country_name: ['']
  });

  this.formbranch = this.fb.group({
    branches: this.fb.array([])  // FormArray for other branches
  });
  
  // this.formbranchadd = this.fb.group({
  //   branches: this.fb.array([])  // FormArray for multiple branches
  // });

  // this.fetchCompanyData();
  
}
  
fetchCompanyData(){
  

  const headOfficeBranch = this.company.branchDetailsModel.find((branch:any) => branch.t2_id_branch_type === 'ed2270d0-8bba-47e9-b343-a3697428c26f');
  if (headOfficeBranch) {
    this.formheadoffice.patchValue({
      t2_company_branch_name: headOfficeBranch.t2_company_branch_name,
      t2_email: headOfficeBranch.t2_email,
      t2_mobile_no: headOfficeBranch.t2_mobile_no,
      t2_phone_no: headOfficeBranch.t2_phone_no,
      t2_address_1: headOfficeBranch.t2_address_1,
      t2_address_2: headOfficeBranch.t2_address_2,
      t2_zip_code: headOfficeBranch.t2_zip_code,
      t2_1_local_name: headOfficeBranch.t2_1_local_name,
      t2_1_div3_name: headOfficeBranch.t2_1_div3_name,
      t2_1_div2_name: headOfficeBranch.t2_1_div2_name,
      t2_1_div1_name: headOfficeBranch.t2_1_div1_name,
      t2_1_country_name: headOfficeBranch.t2_1_country_name
    });
  }
  else{
    console.log("headoffice not find");
    
  }
   // Clear existing branches in FormArray
   const branchArray = this.formbranch.get('branches') as FormArray;
   branchArray.clear();

   // Add other branches dynamically
   this.company.branchDetailsModel
   .filter((branch:any) => branch.t2_id_branch_type !== 'ed2270d0-8bba-47e9-b343-a3697428c26f')  // Exclude head office
   .forEach((branch:any) => branchArray.push(this.createBranchForm(branch)));
}

createBranchForm(branchData: any = {}): FormGroup {
  return this.fb.group({
    
    t2_company_branch_name: [branchData.t2_company_branch_name || '', [Validators.required]],
    t2_email: [branchData.t2_email || '', [Validators.required, ValidationService.email]],
    t2_mobile_no: [branchData.t2_mobile_no || '', [Validators.required, ValidationService.phone]],
    t2_phone_no: [branchData.t2_phone_no || '', [ValidationService.phone]],
    t2_address_1: [branchData.t2_address_1 || '', [Validators.required]],
    t2_address_2: [branchData.t2_address_2 || ''],
    t2_zip_code: [branchData.t2_zip_code || '', [Validators.required]],
    t2_1_local_name: [branchData.t2_1_local_name || '', [Validators.required]],
    t2_1_div3_name: [branchData.t2_1_div3_name || ''],
    t2_1_div2_name: [branchData.t2_1_div2_name || ''],
    t2_1_div1_name: [branchData.t2_1_div1_name || ''],
    t2_1_country_name: [branchData.t2_1_country_name || '']
  });
}

get branchControls(): FormGroup[] {
  return (this.formbranch.get('branches') as FormArray).controls as FormGroup[];
}

  
}


