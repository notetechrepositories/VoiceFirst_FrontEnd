import { Component, Output } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RoleService } from '../../../../../Services/roleService/role.service';
import { SweetalertService } from '../../../../../Services/sweetAlertService/sweetalert.service';

@Component({
  selector: 'app-add-system-role',
  templateUrl: './add-system-role.component.html',
  styleUrl: './add-system-role.component.css'
})
export class AddSystemRoleComponent {
 @Output() closePopup = () => {};

 systemForm !: FormGroup;

  selectedPermissions: string[] = [];
  roleType: any[] = [];
  programWithPermission:any[]=[];
  actionsList: { [key: string]: Array<{ actionName: string; actionId: string }> } = {};


  constructor(
    private fb: FormBuilder,
    private router: Router,
    private roleService: RoleService,
    private sweetalert: SweetalertService
  ) { }

  ngOnInit() {
    this.initializeForm();
  }
  initializeForm() {
    this.systemForm = this.fb.group({
      t5_1_sys_roles_name: ['', [Validators.required]],  
      t5_1_sys_all_location_access: [false], 
      t5_1_sys_all_issues: [false]
    });
  }

  

  
  get checkboxes() {
    return this.systemForm.get('checkboxes') as FormArray;
  }


  onClose() {
    this.closePopup();
    this.router.navigate(['/company/system-role']);
  }
  addNewRole(){
    const data = this.systemForm.value;
    data.t5_1_sys_all_location_access = data.t5_1_sys_all_location_access ? "y" : "n";
    data.t5_1_sys_all_issues = data.t5_1_sys_all_issues ? "y" : "n";
    this.roleService.insertSystemRole(data).subscribe({
      next: (response) => {
        if (response.status == 200) {
          this.sweetalert.showToast("success", "Successfully created.");
          this.closePopup();
          this.systemForm.reset();
        } else {
          this.sweetalert.showToast("error", response.message);
        }
      },
      error: (error) => {
        this.sweetalert.showToast("error", "Oops! Something went wrong.");
      }
    });
}

}
