import { Component, Input, Output } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { RoleService } from '../../../../../Services/roleService/role.service';
import { SweetalertService } from '../../../../../Services/sweetAlertService/sweetalert.service';

@Component({
  selector: 'app-edit-role',
  templateUrl: './edit-role.component.html',
  styleUrl: './edit-role.component.css'
})
export class EditRoleComponent {
@Output() closePopup = () => {};
@Input() roleData: any;

  labels = ['User', 'Country', 'Company']; 
  actions = ['Create', 'View', 'Update', 'Delete' ,'Print']; 
  form: FormGroup;
  selectedPermissions: string[] = [];
  roleType:any[]=[];
  roleTypeName:any[]=[]
  filteredNames: Array<any> = [];
  selectedName: string | null = null;

  constructor(private fb: FormBuilder, private router: Router, private roleService:RoleService, private sweetalert:SweetalertService) {
    this.form = this.fb.group({
      role: [''],
      t5_1_m_type_id:[''],
      id_t4_1_selection_values:[''], 
      checkboxes: this.fb.array(this.initializeCheckboxes())
    });
  }

  ngOnInit(){
    this.getData();
    this.getRoleType();
  }

  getData(): void {
    if (this.roleData) {
      const data = this.roleData;   
      this.form.patchValue({
        role: data.Role.t5_1_m_user_roles_name,
        t5_1_m_type_id: data.Role.t5_1_m_type_id,
        id_t4_1_selection_values: data.Role.id_t4_1_selection_values
      });
      this.selectedPermissions = data.Items;
      this.form.setControl('checkboxes', this.fb.array(this.initializeCheckboxes()));
      const selectedRole = this.roleType.find(
        (role) => role.id_t4_1_selection_values === data.Role.t5_1_m_type_id
      );
    }
  }

  get checkboxes() {
    return this.form.get('checkboxes') as FormArray;
  }
  
  getActionControl(labelIndex: number, actionIndex: number): FormControl {
    return (this.checkboxes.at(labelIndex) as FormArray).at(actionIndex) as FormControl;
  }
  
  createActionGroup() {
    return this.fb.array(this.actions.map(() => false)); // Initialize actions as unchecked
  }

  onCheckboxChange(label: string, action: string, event: any) {
    const permission = `${action} ${label}`;
    if (event.target.checked) {
      this.selectedPermissions.push(permission);
    } else {
      this.selectedPermissions = this.selectedPermissions.filter(p => p !== permission);
    }
  }

  // Initialize checkboxes with pre-selected permissions
     initializeCheckboxes() {
      return this.labels.map(label =>
        this.fb.array(
          this.actions.map(action => {
            const permission = `${action} ${label}`;
            return new FormControl(this.selectedPermissions.includes(permission));
          })
        )
      );
    }

    isRowSelected(rowIndex: number): boolean {
      const rowGroup = this.checkboxes.at(rowIndex) as FormArray;
      return rowGroup.controls.every(control => control.value === true);
    }
  
    toggleRowSelection(rowIndex: number, event: any): void {
      const rowGroup = this.checkboxes.at(rowIndex) as FormArray;
      const isChecked = event.target.checked;
  
      rowGroup.controls.forEach(control => {
        if (control instanceof FormControl) {
          control.setValue(isChecked);
        }
      });
  
      // Update selected permissions
      if (isChecked) {
        this.actions.forEach(action => {
          const permission = `${this.labels[rowIndex]} ${action}`;
          if (!this.selectedPermissions.includes(permission)) {
            this.selectedPermissions.push(permission);
          }
        });
      } else {
        this.actions.forEach(action => {
          const permission = `${this.labels[rowIndex]} ${action}`;
          this.selectedPermissions = this.selectedPermissions.filter(p => p !== permission);
        });
      }
    }

    getRoleType(){
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
  
  
    onRoleTypeChange(event: Event): void {
      const target = event.target as HTMLSelectElement;
      const selectedValue = target?.value;
  
      if (!selectedValue) {
        this.filteredNames = [];
        this.form.get('id_t4_1_selection_values')?.reset();
        return;
      }
  
      const selectedRole = this.roleType.find(
        (role) => role.id_t4_1_selection_values === selectedValue
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
    this.router.navigate(['/components/role']);
  }

  onSave() {
    const formdata=this.form.value;
    const requestBody = {
      t5_1_m_user_roles_name: formdata.role,
      t5_1_m_all_location_access: 0,
      t5_1_m_all_location_type: 0,
      t5_1_m_only_assigned_location: 0,
      id_t4_1_selection_values: formdata.id_t4_1_selection_values,
      t5_1_m_type_id: formdata.t5_1_m_type_id,
      permissions: this.selectedPermissions,
      id_t5_1_m_user_roles: this.roleData.Role.id_t5_1_m_user_roles
    };

    this.roleService.updateRoleandPermission(requestBody).subscribe({
      next:res=>{
        if(res.status==200){
          this.sweetalert.showToast('success','Succefully Inserted');
          this.closePopup();
        }
        else{
          this.sweetalert.showToast('error',res.message);
        }
      },
      error:error=>{
        this.sweetalert.showToast('error','Oops!Something went wrong');
      }
    })
  }

}

