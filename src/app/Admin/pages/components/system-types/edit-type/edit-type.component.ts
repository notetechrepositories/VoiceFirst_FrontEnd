import { Component, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SweetalertService } from '../../../../../Services/sweetAlertService/sweetalert.service';
import { SystemtypeService } from '../../../../../Services/systemTypeService/systemtype.service';

@Component({
  selector: 'app-edit-type',
  templateUrl: './edit-type.component.html',
  styleUrl: './edit-type.component.css'
})
export class EditTypeComponent {
  @Output() closePopup = () => {}; // To close the popup
  @Input() typeData: any; // Input data passed for editing

  
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
        id_t4_sys_selection_values:['',Validators.required]
      });
    }
  
    ngOnInit() {
      this.getData();
    }
  
    onClose() {
      this.closePopup();
      this.router.navigate(['/company/system-type']);
    }

    getData(): void {
      if (this.typeData) {
        const data = this.typeData.Items;
        console.log(data);
        this.form.patchValue({
          t4_1_sys_selection_values_name: data[0].t4_1_sys_selection_values_name,
          id_t4_selection: data[0].id_t4_selection,
          id_t4_sys_selection_values:data[0].id_t4_sys_selection_values
        });
    }
  }
  
    onSave() {

      if(this.form.valid){
        this.sysTypeService.updateSysType(this.form.value).subscribe({
          next:res=>{
            if(res.status==200){
              this.sweetalert.showToast("success", "Successfully updated.");
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
      }
    }
}
