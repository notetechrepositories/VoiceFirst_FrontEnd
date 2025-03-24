import { Component, Output } from '@angular/core';
import { SweetalertService } from '../../../../../Services/sweetAlertService/sweetalert.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SystemtypeService } from '../../../../../Services/systemTypeService/systemtype.service';

@Component({
  selector: 'app-add-type',
  templateUrl: './add-type.component.html',
  styleUrl: './add-type.component.css'
})
export class AddTypeComponent {
 @Output() closePopup = () => {};

  form: FormGroup;

  selectedPermissions: string[] = [];
  roleType: any[] = [];
  programWithPermission:any[]=[];
  actionsList: { [key: string]: Array<{ actionName: string; actionId: string }> } = {};


  constructor(
    private fb: FormBuilder,
    private router: Router,
    private sweetalert: SweetalertService,
        private sysTypeService:SystemtypeService 
  ) {
    this.form = this.fb.group({
      t4_1_sys_selection_values_name: ['',Validators.required],
      id_t4_selection: ['',Validators.required],
    });
  }



 

  onClose() {
    this.closePopup();
    this.router.navigate(['/company/system-type']);
  }

  onSave() {
    if(this.form.valid){
      this.sysTypeService.addSysType(this.form.value).subscribe({
        next:res=>{
          if(res.status==200){
            this.sweetalert.showToast("success", "Successfully created.");
            this.closePopup();
             this.router.navigate(['/company/system-type']);
           }
          else{
            this.sweetalert.showToast('error',res.message);
          }
          
        },
        error:error=>{
          console.log(error);
          
        }
      });
    } else {
      this.form.markAllAsTouched();

    }
   


  }
}
