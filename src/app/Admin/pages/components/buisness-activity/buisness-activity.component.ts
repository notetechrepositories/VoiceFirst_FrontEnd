import { Component } from '@angular/core';
import { SweetalertService } from '../../../../Services/sweetAlertService/sweetalert.service';

@Component({
  selector: 'app-buisness-activity',
  templateUrl: './buisness-activity.component.html',
  styleUrl: './buisness-activity.component.css'
})
export class BuisnessActivityComponent {
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
  
  
  selectedActivities: string[] = [];

  newActivity: string = '';
  isCompany: boolean = false;
  isBranch: boolean = false;
  isSection: boolean = false;
  isLoading: boolean = false;

  // Modal control
  showAddActivityModal: boolean = false;

  // Pagination control
  itemsPerPage: number = 10;
  currentPage: number = 1;
  paginatedOrders: any[] = [];

  constructor(private sweetalert: SweetalertService) {}

  ngOnInit(): void {
    this.updatePaginatedOrders();
  }

  // Pagination Functions
  get totalPages(): number {
    return Math.ceil(this.availableActivities.length / this.itemsPerPage);
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updatePaginatedOrders();
    }
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updatePaginatedOrders();
    }
  }

  updatePaginatedOrders(): void {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    this.paginatedOrders = this.availableActivities.slice(start, end);
  }

  // Modal Controls
  openAddActivityModal(): void {
    this.newActivity = '';
    this.isCompany = false;
    this.isBranch = false;
    this.isSection = false;
    this.showAddActivityModal = true;
  }

  closeAddActivityModal(): void {
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
      t3_sys_sub_section: 'N' // You can change this or add another checkbox in the form
    };
  
    // Push the new activity to the list
    this.availableActivities.push(newActivityObj);
  
    // Refresh paginated data and close modal
    this.updatePaginatedOrders();
    this.closeAddActivityModal();
  
    // Show success message
    this.sweetalert.showToast('success', 'Business Activity added successfully!');
  }
  

  removeSelectedActivity(activity: string): void {
    const index = this.availableActivities.indexOf(activity);

    if (index !== -1) {
      this.availableActivities.splice(index, 1);

      if (this.currentPage > this.totalPages) {
        this.currentPage = this.totalPages || 1;
      }

      this.updatePaginatedOrders();
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
