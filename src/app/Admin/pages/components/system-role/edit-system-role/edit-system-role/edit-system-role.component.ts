import { Component, Input, Output } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RoleService } from '../../../../../../Services/roleService/role.service';
import { SweetalertService } from '../../../../../../Services/sweetAlertService/sweetalert.service';

@Component({
  selector: 'app-edit-system-role',
  templateUrl: './edit-system-role.component.html',
  styleUrl: './edit-system-role.component.css'
})
export class EditSystemRoleComponent {
 @Output() closePopup = () => {}; 
  @Input() roleData: any;
  editSystemForm !: FormGroup; 
  filteredNames: Array<any> = []; 
  syatemRole: any[] = [];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private roleService: RoleService,
    private sweetalert: SweetalertService
  ) {}

 ngOnInit() {
    this.initializeForm();
    this.getData();

  }
  initializeForm() {
    this.editSystemForm = this.fb.group({
      id_t5_1_sys_roles:['', [Validators.required]], 
      t5_1_sys_roles_name: ['', [Validators.required]],  
      t5_1_sys_all_location_access: [false], 
      t5_1_sys_all_issues: [false]
    });
  }
  onClose() {
    this.closePopup();
    this.router.navigate(['/company/system-role']);
  }
  onSave(){
    const data = {
      ...this.editSystemForm.value,
      t5_1_sys_all_location_access: this.editSystemForm.value.t5_1_sys_all_location_access ? 'y' : 'n',
      t5_1_sys_all_issues: this.editSystemForm.value.t5_1_sys_all_issues ? 'y' : 'n'
    };
    this.roleService.updateSystemRole(data).subscribe({
      next: (response) => {
        if (response.message == "Success") {
          this.sweetalert.showToast('success', 'Successfully updated.');
          this.closePopup();
          this.editSystemForm.reset();
        }
        else {
          this.sweetalert.showToast('error', response.message);
        }
      },
      error: (error) => {
        console.error('Error adding location:', error);
        alert('Failed to add location.');
      },
    });
  }
  getData() {
 

    if (this.roleData) {
      const data = this.roleData;
      this.editSystemForm.patchValue({
        id_t5_1_sys_roles:data.id_t5_1_sys_roles,
        t5_1_sys_roles_name: data.t5_1_sys_roles_name,
        t5_1_sys_all_location_access: data.t5_1_sys_all_location_access === 'y',  
    t5_1_sys_all_issues: data.t5_1_sys_all_issues === 'y'
       
      });
    }
  }

}
