import { Component, Output } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { RoleService } from '../../../../../Services/roleService/role.service';
import { SweetalertService } from '../../../../../Services/sweetAlertService/sweetalert.service';

@Component({
  selector: 'app-add-role',
  templateUrl: './add-role.component.html',
  styleUrls: ['./add-role.component.css']
})
export class AddRoleComponent {
  @Output() closePopup = () => {};

  labels = ['User', 'Country', 'Company']; // Dynamic labels
  actions = ['Create', 'View', 'Update', 'Delete', 'Print']; // Actions (checkboxes)
  form: FormGroup;

  selectedPermissions: string[] = [];
  roleType: any[] = [];
  programWithPermission:any[]=[];
  actionsList: { [key: string]: Array<{ actionName: string; actionId: string }> } = {};


  constructor(
    private fb: FormBuilder,
    private router: Router,
    private roleService: RoleService,
    private sweetalert: SweetalertService
  ) {
    this.form = this.fb.group({
      role: [''],
      t5_1_m_type_id: [''],
      id_t4_1_selection_values: [''],
      checkboxes: this.fb.array(this.initializeCheckboxes())
    });
  }

  ngOnInit() {
    this.getRoleType();
    this.getProgramWithPermissions();
  }

  getProgramWithPermissions() {
    this.roleService.getProgramWithPermission().subscribe({
      next: (res) => {
        console.log(res);
        this.programWithPermission = res?.data?.Items || [];
  
        // Map the labels (program names) and actions from API response
        this.labels = this.programWithPermission.map((item: any) => item.t6_program_name);
        this.actionsList = this.programWithPermission.reduce((acc, item) => {
          acc[item.t6_program_name] = item.programActions.map((action: any) => ({
            actionName: action.t6_action,
            actionId: action.id_t6_link_program_with_program_action,
          }));
          return acc;
        }, {});
  
        // Reinitialize the checkboxes
        this.form = this.fb.group({
          role: [''],
          t5_1_m_type_id: [''],
          id_t4_1_selection_values: [''],
          checkboxes: this.fb.array(this.initializeCheckboxes())
        });
      },
      error: (error) => {
        console.error(error);
      }
    });
  }
  
  initializeCheckboxes() {
    return this.programWithPermission.map((item) => {
      const programActions = item.programActions.map((action: any) => ({
        actionName: action.t6_action,
        actionId: action.id_t6_link_program_with_program_action,
      }));
  
      return this.fb.array(
        programActions.map(() => new FormControl(false))
      );
    });
  }
  
  onCheckboxChange(label: string, action: any, event: any) {
    const permissionId = action.actionId; // Store action ID
    if (event.target.checked) {
      if (!this.selectedPermissions.includes(permissionId)) {
        this.selectedPermissions.push(permissionId);
      }
    } else {
      this.selectedPermissions = this.selectedPermissions.filter((id) => id !== permissionId);
    }
  }
  
  toggleRowSelection(rowIndex: number, event: any): void {
    const rowGroup = this.checkboxes.at(rowIndex) as FormArray;
    const programName = this.labels[rowIndex];
    const actionsForProgram = this.actionsList[programName];
    const isChecked = event.target.checked;
  
    rowGroup.controls.forEach((control, i) => {
      control.setValue(isChecked);
      const action = actionsForProgram[i];
      if (isChecked) {
        if (!this.selectedPermissions.includes(action.actionId)) {
          this.selectedPermissions.push(action.actionId);
        }
      } else {
        this.selectedPermissions = this.selectedPermissions.filter((id) => id !== action.actionId);
      }
    });
  }
  
  getActionControl(labelIndex: number, actionIndex: number): FormControl {
    return (this.checkboxes.at(labelIndex) as FormArray).at(actionIndex) as FormControl;
  }
  
  isRowSelected(rowIndex: number): boolean {
    const rowGroup = this.checkboxes.at(rowIndex) as FormArray;
    return rowGroup.controls.every((control) => control.value === true);
  }
  
  get checkboxes() {
    return this.form.get('checkboxes') as FormArray;
  }

  getRoleType() {
    this.roleService.getRoleType().subscribe({
      next: res => {
        this.roleType = res.data.Items;
        console.log(this.roleType);
      },
      error: error => {
        console.log(error);
      }
    });
  }

 

  filteredNames: Array<any> = [];
  selectedName: string | null = null;

  onRoleTypeChange(event: Event): void {
    const target = event.target as HTMLSelectElement;
    const selectedValue = target?.value;

    if (!selectedValue) {
      this.filteredNames = [];
      this.form.get('id_t4_1_selection_values')?.reset();
      return;
    }

    const selectedRole = this.roleType.find(
      role => role.id_t4_1_selection_values === selectedValue
    );
    this.filteredNames = selectedRole ? selectedRole.role_type_data : [];
    if (this.filteredNames.length === 1) {
      this.form.get('id_t4_1_selection_values')?.setValue(this.filteredNames[0].type_id);
    } else {
      this.form.get('id_t4_1_selection_values')?.reset();
    }
  }

  onClose() {
    this.closePopup();
    this.router.navigate(['/role']);
  }

  onSave() {
    console.log(this.form.value);

    const formdata = this.form.value;
    const uniquePermissions = Array.from(new Set(this.selectedPermissions)); // Remove duplicates
    console.log(uniquePermissions);
    

    const requestBody = {
      t5_1_m_user_roles_name: formdata.role,
      t5_1_m_all_location_access: 0,
      t5_1_m_all_location_type: 0,
      t5_1_m_only_assigned_location: 0,
      id_t4_1_selection_values: formdata.id_t4_1_selection_values,
      t5_1_m_type_id: formdata.t5_1_m_type_id,
      permissions: uniquePermissions
    };

    console.log(requestBody);

    this.roleService.insertRole(requestBody).subscribe({
      next: res => {
        if (res.status === 200) {
          this.sweetalert.showToast('success', 'Successfully Inserted');
          this.closePopup();
        } else {
          this.sweetalert.showToast('error', res.message);
        }
      },
      error: error => {
        this.sweetalert.showToast('error', 'Oops! Something went wrong');
        console.log(error);
        
      }
    });
   }
}
