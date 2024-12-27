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
  actions = ['Create', 'View', 'Update', 'Delete' ,'Print']; // Actions (checkboxes)
  form: FormGroup;

  selectedPermissions: string[] = []; 

  roleType:any[]=[];

  constructor(private fb: FormBuilder, 
              private router: Router,
              private roleService:RoleService,
              private sweetalert:SweetalertService) {
    this.form = this.fb.group({
      role: [''],
      t5_1_m_type_id:[''],
      id_t4_1_selection_values:[''], 
      checkboxes: this.fb.array(this.initializeCheckboxes())
    });
  }

  ngOnInit(){
    this.getRoleType();
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
      next:res=>{
        this.roleType=res.data.Items;
        console.log(this.roleType);
        
      },
      error:error=>{
        console.log(error);
      }
    })
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
    console.log(this.form.value);
    
    const formdata=this.form.value;
    const requestBody = {
      t5_1_m_user_roles_name: formdata.role,
      t5_1_m_all_location_access: 0,
      t5_1_m_all_location_type: 0,
      t5_1_m_only_assigned_location: 0,
      id_t4_1_selection_values: formdata.id_t4_1_selection_values,
      t5_1_m_type_id: formdata.t5_1_m_type_id,
      permissions: this.selectedPermissions
    };

    console.log(requestBody);


    this.roleService.insertRole(requestBody).subscribe({
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
