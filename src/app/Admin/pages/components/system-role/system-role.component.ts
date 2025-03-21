import { Component } from '@angular/core';
import { SweetalertService } from '../../../../Services/sweetAlertService/sweetalert.service';

@Component({
  selector: 'app-system-role',
  templateUrl: './system-role.component.html',
  styleUrl: './system-role.component.css'
})
export class SystemRoleComponent {
  availableRoles: string[] = [
    'Management',
    'Branch Management',
    'App Admin',
    'App Branch Admin',
    'Staff',
    'Public',
    'Vendor',
    'Customer',
    'Verified Customer',
    'Third Party Company',
    'Notetech Admin',
    'Notetech Staff',
    'Marketing team',
    'Third Party Marketing Team'
  ];

  selectedRoles= this.availableRoles;

  // New role properties
  newRole: string = '';
  allLocationAccess: boolean = false;
  allIssueAccess: boolean = false;

  // Modal control
  showAddRoleModal: boolean = false;

  constructor(
    private sweetalert:SweetalertService
  ) {}

  toggleRoleSelection(role: string): void {
    const index = this.selectedRoles.indexOf(role);
    if (index === -1) {
      this.selectedRoles.push(role);
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

  addNewRole(): void {
    const trimmedRole = this.newRole.trim();
    console.log(trimmedRole);
    
    if (!trimmedRole) {
      alert('Role name cannot be empty!');
      return;
    }

    if (this.selectedRoles.includes(trimmedRole)) {
      alert('This role is already selected!');
      return;
    }

    // Add custom role to selectedRoles
    this.selectedRoles.push(trimmedRole);

    // Optionally log the checkbox values for backend or further use
    console.log('All Location Access:', this.allLocationAccess);
    console.log('All Issue Access:', this.allIssueAccess);

    // Close modal
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
    if(this.selectedRoles.length>0){
      this.sweetalert.showToast('success','Roles Added Successfully')
    }
  }
}
