import { Component } from '@angular/core';
import { LocalstorageService } from '../../../../Services/localStorageService/localstorage.service';
import { jwtDecode } from 'jwt-decode';
import { UserService } from '../../../../Services/userService/user.service';
import { FormBuilder,FormControl,FormGroup,Validators } from '@angular/forms';



@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {

  constructor(
    private localStorageService:LocalstorageService,
    private userService:UserService,
    private fb:FormBuilder
  ){}

  encryUserId!:string;
  userDetails!: any;
  userDataForm!: FormGroup;
  
  isEditing: boolean=false;
  ngOnInit(){
    this.initialiseForm();
    this.getUserDetails();
    
  }

  initialiseForm(){
    this.userDataForm = this.fb.group({
      t5_first_name: [{value:'', disabled:true},[Validators.required]],
      t5_last_name: [{value:'', disabled:true},[Validators.required]],
      t5_birth_year: [{value:'', disabled:true},[Validators.required]],
      t5_sex: [{value:'', disabled:true},[Validators.required]],
      t2_1_local_name: [{value:'', disabled:true},[Validators.required]],
      id_t2_1_country: [{value:'', disabled:true},[Validators.required]],
      id_t2_1_div1: [{value:'', disabled:true},[Validators.required]],
      id_t2_1_div2: [{value:'', disabled:true},[Validators.required]],
      id_t2_1_div3: [{value:'', disabled:true},[Validators.required]],
      t5_email: [{ value: '', disabled: true },[Validators.required]],
      t5_mobile_no: [{ value: '', disabled: true },[Validators.required]],
      t5_address_1: [{ value: '', disabled: true },[Validators.required]],
      t5_address_2: [{ value: '', disabled: true },[Validators.required]],
      t5_zip_code: [{ value: '', disabled: true },[Validators.required]],
      id_t5_users:[{ value: '', disabled: true },[Validators.required]],
      id_t2_1_local:[{ value: '', disabled: true },[Validators.required]],

      // t5_email: new FormControl(''),
      // t5_mobile_no: new FormControl(''),
      // t5_address_1: new FormControl(''),
      // t5_address_2: new FormControl(''),
      // t5_zip_code: new FormControl('')
    })
    
  }
 
  getUserDetails(){
   
    this.userService.getAdminProfile().subscribe({
      next:(res)=>{
        if(res.status==200){
          this.userDetails= res.data.Items;
          console.log("fetcheddata are:",res.data.Items);
          this.userDataForm.patchValue({
            t5_first_name: this.userDetails.t5_first_name,
            t5_last_name: this.userDetails.t5_last_name,
            t5_birth_year:this.userDetails.t5_birth_year,
            t5_sex:this.userDetails.t5_sex,
            t2_1_local_name:this.userDetails.t2_1_local_name,
            id_t2_1_country:this.userDetails.id_t2_1_country,
            id_t2_1_div1:this.userDetails.id_t2_1_div1,
            id_t2_1_div2:this.userDetails.id_t2_1_div2,
            id_t2_1_div3:this.userDetails.id_t2_1_div3,
            t5_email: this.userDetails.t5_email,
            t5_mobile_no: this.userDetails.t5_mobile_no,
            t5_address_1: this.userDetails.t5_address_1,
            t5_address_2: this.userDetails.t5_address_2,
            t5_zip_code: this.userDetails.t5_zip_code,
            id_t5_users: this.userDetails.id_t5_users,
            id_t2_1_local: this.userDetails.id_t2_1_local
          })
          
        }
        else{
          console.log("error on fetchng user details");
          
        }
      }
    }) 
  }

  onEditClick(event: Event) {
    event.preventDefault(); // Prevents default link behavior
    console.log('Edit button clicked!');
    
    // Example: Toggle form edit mode
    this.isEditing = true;
    this.userDataForm.enable();
    
  }
  
  onSaveClick(  ){
    const requestData={
      t5_first_name:this.userDataForm.get('t5_first_name')?.value,
      t5_last_name:this.userDataForm.get('t5_last_name')?.value,
      t5_address_1:this.userDataForm.get('t5_address_1')?.value,
      t5_address_2:this.userDataForm.get('t5_address_2')?.value,
      t5_zip_code:this.userDataForm.get('t5_zip_code')?.value,
      t5_mobile_no:this.userDataForm.get('t5_mobile_no')?.value,
      t5_email:this.userDataForm.get('t5_email')?.value,
      t5_birth_year:this.userDataForm.get('t5_birth_year')?.value,
      t5_sex:this.userDataForm.get('t5_sex')?.value,
      id_t2_1_country:this.userDataForm.get('id_t2_1_country')?.value,
      id_t2_1_div1:this.userDataForm.get('id_t2_1_div1')?.value,
      id_t2_1_div2:this.userDataForm.get('id_t2_1_div2')?.value,
      id_t2_1_div3:this.userDataForm.get('id_t2_1_div3')?.value,
      t2_1_local_name:this.userDataForm.get('t2_1_local_name')?.value,
      id_t5_users: this.userDataForm.get('id_t5_users')?.value,
      id_t2_1_local:this.userDataForm.get('id_t2_1_local')?.value
      
    }
    // if(this.userDataForm.valid){
      // Log the request payload before sending

    console.log('Sending Update Payload:', requestData);

      this.userService.putAdminProfile(requestData).subscribe({
        next:(res)=>{
          console.log('Profile Updated Successfully:', res);
          this.isEditing = false;
          this.userDataForm.disable(); // Disable form after saving
          
        },
        error: (error) => {
          console.error('Error updating profile:', error);
          
        }
      });
    // }
    // else{
    //   console.log('Form is invalid!');
    // }
  }

  calculateAge(): number {
    const birthYear= this.userDetails.t5_birth_year;
    if (!birthYear)
       return 0; // Handle invalid input
    const currentYear = new Date().getFullYear(); // Get current year
    return currentYear - birthYear; // Subtract birth year from current year
  }
  

}


