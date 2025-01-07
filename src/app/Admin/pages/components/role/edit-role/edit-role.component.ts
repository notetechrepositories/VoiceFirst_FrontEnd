import { Component, Input, Output } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { RoleService } from '../../../../../Services/roleService/role.service';
import { SweetalertService } from '../../../../../Services/sweetAlertService/sweetalert.service';

@Component({
  selector: 'app-edit-role',
  templateUrl: './edit-role.component.html',
  styleUrls: ['./edit-role.component.css'],
})
export class EditRoleComponent {
  @Output() closePopup = () => {}; // To close the popup
  @Input() roleData: any; // Input data passed for editing

  labels: string[] = []; // List of dynamic program names (e.g., User, Company, Country)
  actionsList: { [key: string]: Array<{ actionName: string; actionId: string }> } = {}; // Dynamic actions for each label
  form: FormGroup; // Main form group
  selectedPermissions: string[] = []; // List of selected permission IDs
  roleType: any[] = []; // List of role types
  filteredNames: Array<any> = []; // Filtered names based on role type selection
  programWithPermission:any[] = [];

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
      checkboxes: this.fb.array([]), // FormArray for checkboxes
    });
  }

  ngOnInit() {
    this.getProgramWithPermissions(); 
    this.getRoleType(); 
    this.getData();
  }

  /** Fetch program names and actions dynamically */
  getProgramWithPermissions(): void {
    this.roleService.getProgramWithPermission().subscribe({
      next: (res) => {
        this.programWithPermission = res?.data?.Items || [];

        // Extract labels (program names) and actions
        this.labels = this.programWithPermission.map((item: any) => item.t6_program_name);
        this.actionsList = this.programWithPermission.reduce((acc, item) => {
          acc[item.t6_program_name] = item.programActions.map((action: any) => ({
            actionName: action.t6_action,
            actionId: action.id_t6_link_program_with_program_action,
          }));
          return acc;
        }, {});

        this.getData(); // Initialize form with pre-selected permissions
      },
      error: (error) => {
        console.error(error);
      },
    });
  }

  /** Populate form with existing data */
  getData(): void {
    if (this.roleData) {
      const data = this.roleData;
      console.log(data);
      
      this.selectedPermissions = data.Items;
      console.log(this.selectedPermissions);
      
      this.form.patchValue({
        role: data.Role.t5_1_m_user_roles_name,
        t5_1_m_type_id: data.Role.t5_1_m_type_id,
        id_t4_1_selection_values: data.Role.id_t4_1_selection_values,
      });

      // Initialize checkboxes based on selectedPermissions
      this.form.setControl('checkboxes', this.fb.array(this.initializeCheckboxes()));
    }
  }

  /** Initialize FormArray of checkboxes */
  initializeCheckboxes() {
    return this.labels.map((label) =>
      this.fb.array(
        this.actionsList[label].map((action) => {
          // Check if actionId exists in selectedPermissions
          return new FormControl(this.selectedPermissions.includes(action.actionId));
        })
      )
    );
  }

  /** Form getter for checkboxes */
  get checkboxes() {
    return this.form.get('checkboxes') as FormArray;
  }

  /** Get form control for a specific action */
  getActionControl(labelIndex: number, actionIndex: number): FormControl {
    return (this.checkboxes.at(labelIndex) as FormArray).at(actionIndex) as FormControl;
  }

  /** Handle individual checkbox changes */
  onCheckboxChange(label: string, action: any, event: any) {
    const permissionId = action.actionId; // Use actionId instead of combined string
    if (event.target.checked) {
      if (!this.selectedPermissions.includes(permissionId)) {
        this.selectedPermissions.push(permissionId);
      }
    } else {
      this.selectedPermissions = this.selectedPermissions.filter((id) => id !== permissionId);
    }
  }

  /** Handle row-level checkbox changes (select all/unselect all) */
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

  /** Check if all actions in a row are selected */
  isRowSelected(rowIndex: number): boolean {
    const rowGroup = this.checkboxes.at(rowIndex) as FormArray;
    return rowGroup.controls.every((control) => control.value === true);
  }

  /** Get role types for dropdown */
  getRoleType() {
    this.roleService.getRoleType().subscribe({
      next: (res) => {
        this.roleType = res.data.Items;
        this.roleType.forEach((role) => {
          if (this.roleData.Role.t5_1_m_type_id === role.id_t4_1_selection_values) {
            this.filteredNames = role.role_type_data;
            this.filteredNames.forEach((filteredName) => {
              if (this.roleData.Role.id_t4_1_selection_values === filteredName.type_id) {
                this.form.patchValue({
                  id_t4_1_selection_values: filteredName.type_id,
                });
              }
            });
          }
        });
      },
      error: (error) => {
        console.error(error);
      },
    });
  }

  /** Handle role type dropdown changes */
  onRoleTypeChange(event: Event): void {
    const target = event.target as HTMLSelectElement;
    const selectedValue = target?.value;

    if (!selectedValue) {
      this.filteredNames = [];
      this.form.get('id_t4_1_selection_values')?.reset();
      return;
    }

    const selectedRole = this.roleType.find((role) => role.id_t4_1_selection_values === selectedValue);
    this.filteredNames = selectedRole ? selectedRole.role_type_data : [];

    if (this.filteredNames.length === 1) {
      this.form.get('id_t4_1_selection_values')?.setValue(this.filteredNames[0].type_id);
    } else {
      this.form.get('id_t4_1_selection_values')?.reset();
    }
  }

  /** Close the popup */
  onClose() {
    this.closePopup();
    this.router.navigate(['/components/role']);
  }

  /** Save form data */
  onSave() {
    const formdata = this.form.value;
    const requestBody = {
      t5_1_m_user_roles_name: formdata.role,
      t5_1_m_all_location_access: 0,
      t5_1_m_all_location_type: 0,
      t5_1_m_only_assigned_location: 0,
      id_t4_1_selection_values: formdata.id_t4_1_selection_values,
      t5_1_m_type_id: formdata.t5_1_m_type_id,
      permissions: this.selectedPermissions, // List of action IDs
      id_t5_1_m_user_roles: this.roleData.Role.id_t5_1_m_user_roles,
    };
    console.log(this.selectedPermissions);
    
    this.roleService.updateRoleandPermission(requestBody).subscribe({
      next: (res) => {
        if (res.status === 200) {
          this.sweetalert.showToast('success', 'Successfully Updated');
          this.closePopup();
        } else {
          this.sweetalert.showToast('error', res.message);
        }
      },
      error: (error) => {
        this.sweetalert.showToast('error', 'Oops! Something went wrong');
      },
    });
  }
}
