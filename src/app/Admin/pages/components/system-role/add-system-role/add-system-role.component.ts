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


  permissions = [
    {
      program_name: 'Company',
      add: 'y',
      edit: 'n',
      delete: 'n',
      view: 'y',
      update_from_excel: 'y',
      download_excel: 'n',
      download_pdf: 'y'
    },
    {
      program_name: 'Department',
      add: 'n',
      edit: 'y',
      delete: 'y',
      view: 'y',
      update_from_excel: 'n',
      download_excel: 'y',
      download_pdf: 'n'
    }
  ];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private roleService: RoleService,
    private sweetalert: SweetalertService
  ) { }

  ngOnInit() {
    this.initializeForm();
    this.loadPermissions();
  }
  initializeForm() {
    this.systemForm = this.fb.group({
      t5_1_sys_roles_name: ['', [Validators.required]],  
      t5_1_sys_all_location_access: [false], 
      t5_1_sys_all_issues: [false],
      permissions: this.fb.array([])
    });
  }

  
  get permissionsArray(): FormArray {
    return this.systemForm.get('permissions') as FormArray;
  }
  
  loadPermissions() {
    this.permissions.forEach(program => {
      const controls: any = {
        program_name: [program.program_name]
      };
  
      const programTyped = program as Record<string, string>;
  
      Object.keys(programTyped).forEach(key => {
        if (key !== 'program_name' && programTyped[key] === 'y') {
          controls[key] = [false]; // 👈 visible but unchecked
        }
      });
  
      this.permissionsArray.push(this.fb.group(controls));
    });
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
