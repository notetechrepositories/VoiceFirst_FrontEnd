import { Component } from '@angular/core';
import { SweetalertService } from '../../../../Services/sweetAlertService/sweetalert.service';
import { RoleService } from '../../../../Services/roleService/role.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

export interface Role{
  id_t5_1_sys_roles:string;
  t5_1_roles_name:string;
  t5_1_all_location_access:string;
  t5_1_all_issues:string;
}
@Component({
  selector: 'app-company-role',
  templateUrl: './company-role.component.html',
  styleUrl: './company-role.component.css'
})
export class CompanyRoleComponent {
   systemRoles:any[] = [];
  
    filteredRoles: any[] = [];
    paginatedOrders: any[] = [];
    selectedRoles: any[] = [];
    companyRoles:Role[]=[];
    companyForm!:FormGroup;
    newRole: string = '';
    allLocationAccess: boolean = false;
    allIssueAccess: boolean = false;
    showAddRoleModal: boolean = false;

  constructor(
    private sweetalert:SweetalertService, private roleService: RoleService, private fb:FormBuilder
  ) {}
  ngOnInit() {
    this.getAllSystemRoles();
    this.initializeForm();
    this.getCompanyRole();
  }
   initializeForm() {
      this.companyForm = this.fb.group({
        id_t5_1_company_roles:[''],
        id_t5_1_sys_roles:[''],
        t5_1_roles_name: ['', [Validators.required]],  
        t5_1_all_location_access: [false], 
        t5_1_all_issues: [false]
      });
    }
  toggleRoleSelection(rolename: string,id:string,location:string,issue:string): void {
    const index = this.selectedRoles.indexOf(rolename);
    if (index === -1) {
      const rolelist={
        id_t5_1_sys_roles: id,
        t5_1_all_issues:issue,
        t5_1_all_location_access:location,
        t5_1_roles_name:rolename
      }
      this.selectedRoles.push(rolelist);
      console.log(this.selectedRoles);
      
    } else {
      this.selectedRoles.splice(index, 1);
    }
  }

  openAddRoleModal(): void {
    this.newRole = '';
    this.allLocationAccess = false;
    this.allIssueAccess = false;
    this.showAddRoleModal = true;
  }

  closeAddRoleModal(): void {
    this.showAddRoleModal = false;
  }
  getAllSystemRoles(){
    this.roleService.getSystemRole().subscribe({
      next: (res) => {
        console.log(res);
        
        if (res.status == 200) {
          this.systemRoles = res.data.Items;
          
        }
      },
      error: (error) => {
        console.log(error);
        this.sweetalert.showToast('error', 'Oops! Something went wrong');
       
      },
    });
  }

  addNewRole(): void {
    const data = this.companyForm.value;
    data.t5_1_all_location_access = data.t5_1_all_location_access ? "y" : "n";
    data.t5_1_all_issues = data.t5_1_all_issues ? "y" : "n";
    this.selectedRoles = [...this.selectedRoles, data];
    this.companyForm.reset();
    this.closeAddRoleModal();
  }
  

  removeSelectedRole(role: string): void {
    const index = this.selectedRoles.indexOf(role);
    if (index !== -1) {
      this.selectedRoles.splice(index, 1);
    }
  }

  isSelected(role: string): boolean {
    return this.selectedRoles.includes(role);
  }

  onSubmit(){
    
    console.log(this.selectedRoles);
    
    this.roleService.updateCompanyRole(this.selectedRoles).subscribe({
      next: (response) => {
        console.log(response);
        
        if (response.status == 200) {
          this.sweetalert.showToast("success", "Successfully created.");
          this.closeAddRoleModal();
          this.companyForm.reset();
        } else {
          this.sweetalert.showToast("error", response.message);
        }
      },
      error: (error) => {
        this.sweetalert.showToast("error", "Oops! Something went wrong.");
      }
    });

    // if(this.selectedRoles.length>0){
    //   this.sweetalert.showToast('success','Roles Added Successfully')
    // }
  }

  getCompanyRole(){
    this.roleService.getCompanyRole().subscribe({
      next: (res) => {
        console.log(res);
        this.selectedRoles = res.data.Items || [];
        console.log(this.selectedRoles);
       
      },
      error: (error) => {
        console.log('Failed to load locations:', error);
      },
    });
  }
  editingRoleId: string | null = null; // Track which role is being edited
  editedRole: any = {}; // Store role data being edited
  
  editSelectedRole(role: any) {
    this.editingRoleId = role.id_t5_1_company_roles; // Identify role being edited
    this.editedRole = { ...role }; // Clone role data for editing
  }
  
  saveEditedRole() {
    if (this.editingRoleId) {
      const index = this.selectedRoles.findIndex(role => role.id_t5_1_company_roles === this.editingRoleId);
      if (index !== -1) {
        this.selectedRoles[index] = { ...this.editedRole }; // Update the list
      }
      this.editingRoleId = null; // Exit edit mode
    }
  }
  
}
