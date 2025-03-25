import { Component } from '@angular/core';
import { SweetalertService } from '../../../../Services/sweetAlertService/sweetalert.service';

@Component({
  selector: 'app-company-buisness-activity',
  templateUrl: './company-buisness-activity.component.html',
  styleUrl: './company-buisness-activity.component.css'
})
export class CompanyBuisnessActivityComponent {
  availableActivities: any[] = [
    {
      t3_sys_business_activity_name: 'Food',
      t3_sys_company: 'Y',
      t3_sys_branch: 'N',
      t3_sys_section: 'N',
      t3_sys_sub_section: 'N'
    },
    {
      t3_sys_business_activity_name: 'Vehicle',
      t3_sys_company: 'Y',
      t3_sys_branch: 'Y',
      t3_sys_section: 'N',
      t3_sys_sub_section: 'N'
    },
    {
      t3_sys_business_activity_name: 'Electronics',
      t3_sys_company: 'Y',
      t3_sys_branch: 'N',
      t3_sys_section: 'Y',
      t3_sys_sub_section: 'N'
    },
    {
      t3_sys_business_activity_name: 'Furniture',
      t3_sys_company: 'Y',
      t3_sys_branch: 'Y',
      t3_sys_section: 'Y',
      t3_sys_sub_section: 'N'
    },
    {
      t3_sys_business_activity_name: 'Clothing',
      t3_sys_company: 'N',
      t3_sys_branch: 'Y',
      t3_sys_section: 'Y',
      t3_sys_sub_section: 'Y'
    },
    {
      t3_sys_business_activity_name: 'Healthcare',
      t3_sys_company: 'N',
      t3_sys_branch: 'N',
      t3_sys_section: 'N',
      t3_sys_sub_section: 'Y'
    },
    {
      t3_sys_business_activity_name: 'Education',
      t3_sys_company: 'Y',
      t3_sys_branch: 'Y',
      t3_sys_section: 'N',
      t3_sys_sub_section: 'N'
    },
    {
      t3_sys_business_activity_name: 'Transport',
      t3_sys_company: 'N',
      t3_sys_branch: 'Y',
      t3_sys_section: 'N',
      t3_sys_sub_section: 'Y'
    },
    {
      t3_sys_business_activity_name: 'Entertainment',
      t3_sys_company: 'N',
      t3_sys_branch: 'N',
      t3_sys_section: 'Y',
      t3_sys_sub_section: 'Y'
    },
    {
      t3_sys_business_activity_name: 'Real Estate',
      t3_sys_company: 'Y',
      t3_sys_branch: 'N',
      t3_sys_section: 'N',
      t3_sys_sub_section: 'N'
    },
    {
      t3_sys_business_activity_name: 'Pharmaceutical',
      t3_sys_company: 'Y',
      t3_sys_branch: 'N',
      t3_sys_section: 'Y',
      t3_sys_sub_section: 'N'
    },
    {
      t3_sys_business_activity_name: 'Tourism',
      t3_sys_company: 'N',
      t3_sys_branch: 'Y',
      t3_sys_section: 'Y',
      t3_sys_sub_section: 'N'
    },
    {
      t3_sys_business_activity_name: 'Marketing',
      t3_sys_company: 'N',
      t3_sys_branch: 'Y',
      t3_sys_section: 'Y',
      t3_sys_sub_section: 'N'
    },
    {
      t3_sys_business_activity_name: 'Logistics',
      t3_sys_company: 'Y',
      t3_sys_branch: 'Y',
      t3_sys_section: 'Y',
      t3_sys_sub_section: 'N'
    }
  ];

  selectedActivities: any[] = [];
  isEditMode: boolean = false;
  editingIndex: number = -1; 

  newActivity: string = '';
  isCompany: boolean = false;
  isBranch: boolean = false;
  isSection: boolean = false;
  isLoading: boolean = false;

  // Modal control
  showAddActivityModal: boolean = false;

  constructor(
    private sweetalert:SweetalertService
  ) {}

  toggleRoleSelection(buisnessActivity: string): void {
    const index = this.selectedActivities.indexOf(buisnessActivity);
    const newActivityObj = {
      t3_sys_business_activity_name: buisnessActivity,
      // t3_sys_company: this.isCompany ? 'Y' : 'N',
      // t3_sys_branch: this.isBranch ? 'Y' : 'N',
      // t3_sys_section: this.isSection ? 'Y' : 'N',
      // t3_sys_sub_section: 'N'
    };
    if (index === -1) {
      this.selectedActivities.push(newActivityObj);
      console.log(this.selectedActivities);
      
    } else {
      this.selectedActivities.splice(index, 1);
    }
  }

  openAddActivityModal(): void {
    this.newActivity = '';
    this.isCompany = false;
    this.isBranch = false;
    this.isSection = false;
    this.showAddActivityModal = true;
  }

  closeAddRoleModal(): void {
    this.showAddActivityModal = false;
  }

  addNewActivity(): void {
    const trimmedActivity = this.newActivity.trim();
  
    if (!trimmedActivity) {
      alert('Business Activity name cannot be empty!');
      return;
    }
  
    // Check if an activity with the same name already exists
    const exists = this.availableActivities.some(
      act => act.t3_sys_business_activity_name.toLowerCase() === trimmedActivity.toLowerCase()
    );
  
    if (exists) {
      alert('This Business Activity is already listed!');
      return;
    }
  
    // Create the new activity object
    const newActivityObj = {
      t3_sys_business_activity_name: trimmedActivity,
      t3_sys_company: this.isCompany ? 'Y' : 'N',
      t3_sys_branch: this.isBranch ? 'Y' : 'N',
      t3_sys_section: this.isSection ? 'Y' : 'N',
      t3_sys_sub_section: 'N'
    };
  
    // Push the new activity to the list
    this.selectedActivities.push(newActivityObj);
    this.closeAddRoleModal();
  
  }
  
  editActivity(activity: any, index: number): void {
    this.newActivity = activity.t3_sys_business_activity_name;
    this.isCompany = activity.t3_sys_company === 'Y';
    this.isBranch = activity.t3_sys_branch === 'Y';
    this.isSection = activity.t3_sys_section === 'Y';

    this.isEditMode = true;
    this.editingIndex = index;
    this.showAddActivityModal = true;
  }
  removeSelectedActivity(activity: string): void {
    const index = this.availableActivities.indexOf(activity);

    if (index !== -1) {
      this.availableActivities.splice(index, 1);
      this.sweetalert.showToast('success', 'Business Activity removed successfully!');
    }
  }

  // Helper
  isSelected(activity: string): boolean {
    return this.selectedActivities.includes(activity);
  }

  onSubmit(): void {
    if (this.selectedActivities.length > 0) {
      this.sweetalert.showToast('success', 'System Business Activities Saved Successfully!');
    }
  }
}
