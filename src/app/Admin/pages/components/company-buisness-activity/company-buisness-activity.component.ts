import { Component } from '@angular/core';
import { SweetalertService } from '../../../../Services/sweetAlertService/sweetalert.service';
import { BuisnessActivityService } from '../../../../Services/buisnessActivity/buisness-activity.service';
export interface BusinessActivity {
  id_t3_sys_business_activity: string;
  t3_company_business_activity_name: string;
  t3_company: 'y' | 'n';
  t3_branch: 'y' | 'n';
  t3_section: 'y' | 'n';
  t3_sub_section: 'y' | 'n';
  id_t3_company_business_activity: string;
}

@Component({
  selector: 'app-company-buisness-activity',
  templateUrl: './company-buisness-activity.component.html',
  styleUrl: './company-buisness-activity.component.css'
})
export class CompanyBuisnessActivityComponent {
  availableActivities: any[] = [];
  selectedActivities: any[] = [];
  companyActivities:BusinessActivity[]=[];
  isEditMode: boolean = false;
  editingIndex: number = -1; 

  newActivity: string = '';
  isCompany: boolean = false;
  isBranch: boolean = false;
  isSection: boolean = false;
  isSubSection: boolean =false;
  isLoading: boolean = false;
  hasUnsavedChanges: boolean = false;

  // Modal control
  showAddActivityModal: boolean = false;

  constructor(
    private sweetalert:SweetalertService,
    private buisnessActService:BuisnessActivityService
  ) {}

  ngOnInit(){
    this.getBuisnessActivity();
    this.getCompanyBuisnessActivity();
  }

  getBuisnessActivity(){
    this.buisnessActService.getSysBuisnessActivity().subscribe({
      next:res=>{
        this.availableActivities=res.data.Items;
        console.log(this.availableActivities);
      },
      error:error=>{
        console.log(error);
      }
    })
  }

  getCompanyBuisnessActivity(){
    this.buisnessActService.getCompanyActivity().subscribe({
      next:res=>{
        console.log(res);
        this.companyActivities=res.data.Items;
        this.selectedActivities = this.companyActivities.map((activity: any) => ({
          id_t3_sys_business_activity: activity.id_t3_sys_business_activity,
          t3_company_business_activity_name: activity.t3_company_business_activity_name,
          t3_company: activity.t3_company,
          t3_branch: activity.t3_branch,
          t3_section: activity.t3_section,
          t3_sub_section: activity.t3_sub_section,
          id_t3_company_business_activity: activity.id_t3_company_business_activity
        }));
  
        console.log('Filtered Selected Activities:', this.selectedActivities);
        
      },
      error:error=>{
        console.log(error);
        
      }
    })
  }

  toggleRoleSelection(activity: any): void {
    const exists = this.selectedActivities.some(
      act => act.t3_company_business_activity_name.toLowerCase() === activity.t3_sys_business_activity_name.toLowerCase()
    );

    if (exists) {
      this.sweetalert.showToast('error','This Business Activity is already listed!');
      return;
    }

    const index = this.selectedActivities.indexOf(activity.t3_sys_business_activity_name);
    const newActivityObj = {
      id_t3_sys_business_activity:activity.id_t3_sys_business_activity,
      t3_company_business_activity_name: activity.t3_sys_business_activity_name,
      t3_company: activity.t3_sys_company ? 'y' : 'n',
      t3_branch: activity.t3_sys_branch ? 'y' : 'n',
      t3_section: activity.t3_sys_section ? 'y' : 'y',
      t3_sub_section: activity.t3_sys_sub_section ? 'y' : 'y',
      id_t3_company_business_activity:''
    };
    if (index === -1) {
      this.selectedActivities.push(newActivityObj);
      this.hasUnsavedChanges = true;
      
    } else {
      this.selectedActivities.splice(index, 1);
    }
  }

  openAddActivityModal(): void {
    this.newActivity = '';
    this.isCompany = false;
    this.isBranch = false;
    this.isSection = false;
    this.isSubSection=false;
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
    const exists1 = this.availableActivities.some(
      act => act.t3_sys_business_activity_name.toLowerCase() === trimmedActivity.toLowerCase()
    );

    const exists2 = this.selectedActivities.some(
      act => act.t3_company_business_activity_name.toLowerCase() === trimmedActivity.toLowerCase()
    );
  
    if (exists1 || exists2) {
      this.sweetalert.showToast('error','This Business Activity is already listed!');
      return;
    }


    const newActivityObj = {
      id_t3_sys_business_activity:'',
      t3_company_business_activity_name: trimmedActivity,
      t3_company: this.isCompany ? 'y' : 'n',
      t3_branch: this.isBranch ? 'y' : 'n',
      t3_section: this.isSection ? 'y' : 'y',
      t3_sub_section: this.isSubSection ? 'y' : 'y',
      id_t3_company_business_activity:''
    };
  
    // Push the new activity to the list
    this.selectedActivities.push(newActivityObj);
    this.hasUnsavedChanges = true;
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
  removeSelectedActivity(activityName: string): void {
    const index = this.selectedActivities.findIndex(
      (a) => a.t3_company_business_activity_name === activityName
    );
  
    if (index !== -1) {
      this.selectedActivities.splice(index, 1);
      this.hasUnsavedChanges=true;
    } else {
      console.warn('Activity not found:', activityName);
    }
  }
  // Helper
  isSelected(activity: any): boolean {
    return this.selectedActivities.some(
      a => a.id_t3_sys_business_activity === activity.id_t3_sys_business_activity
    );
  }

  onSubmit(): void {
    console.log(this.selectedActivities);
    
    if (this.selectedActivities.length > 0) {
      this.buisnessActService.saveCompanyActivity(this.selectedActivities).subscribe({
        next:res=>{
          console.log(res);
          if(res.status==200){
            this.sweetalert.showToast('success', 'System Business Activities Saved Successfully!');
            this.hasUnsavedChanges=false
            this.getBuisnessActivity();
          }
        },
        error:error=>{
          console.log(error);
        }
      });
      
    }
  }
}
