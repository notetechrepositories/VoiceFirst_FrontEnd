import { Component } from '@angular/core';
import { SweetalertService } from '../../../../Services/sweetAlertService/sweetalert.service';
import { BuisnessActivityService } from '../../../../Services/buisnessActivity/buisness-activity.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-buisness-activity',
  templateUrl: './buisness-activity.component.html',
  styleUrl: './buisness-activity.component.css'
})
export class BuisnessActivityComponent {

  availableActivities: any[] = [];
  selectedActivities: string[] = [];

  newActivity: string = '';
  isCompany: boolean = false;
  isBranch: boolean = false;
  isSection: boolean = false;
  isSubSection: boolean = false;
  isLoading: boolean = false;
  activityId:string='';

  // Modal control
  showAddActivityModal: boolean = false;
  showEditActivityModal:boolean = false;

  // Pagination control
  itemsPerPage: number = 10;
  currentPage: number = 1;
  paginatedOrders: any[] = [];

  constructor(
    private sweetalert: SweetalertService,
    private buisnessActService: BuisnessActivityService
  ) {}

  ngOnInit(): void {
    this.getBuisnessActivity();
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

  getBuisnessActivity(){
    this.buisnessActService.getSysBuisnessActivity().subscribe({
      next:res=>{
        this.availableActivities=res.data.Items;
        console.log(this.availableActivities);
        
        this.updatePaginatedOrders();
      },
      error:error=>{
        console.log(error);
      }
    })
  }

  // Modal Controls
  openAddActivityModal(): void {
    this.newActivity = '';
    this.isCompany = false;
    this.isBranch = false;
    this.isSection = false;
    this.isSubSection = false;
    this.showAddActivityModal = true;
  }

  closeAddActivityModal(): void {
    this.showAddActivityModal = false;
    this.showEditActivityModal = false;
    this.newActivity = '';
    this.isCompany = false;
    this.isBranch = false;
    this.isSection = false;
    this.isSubSection = false;
    this.activityId='';
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
      // alert('This Business Activity is already listed!');
      this.sweetalert.showToast('error','This Business Activity is already listed!');
      return;
    }
  
    // Create the new activity object
    const newActivityObj = {
      t3_sys_business_activity_name: trimmedActivity,
      t3_sys_company: this.isCompany ? 'y' : 'n',
      t3_sys_branch: this.isBranch ? 'y' : 'n',
      t3_sys_section: this.isSection ? 'y' : 'n',
      t3_sys_sub_section: this.isSubSection ? 'y' : 'n',
    };
  
    this.buisnessActService.addSysBuisnessActivity(newActivityObj).subscribe({
      next:res=>{
        console.log(res);
        if(res.status==200){
          this.availableActivities.push(newActivityObj);
          this.updatePaginatedOrders();
          this.closeAddActivityModal();
          this.sweetalert.showToast('success', 'Business Activity added successfully!');
        }
        else{
          this.sweetalert.showToast('error', res.message);
        }
      },
      error:error=>{
        console.log(error);
        this.sweetalert.showToast('error', 'Something went wrong!');
      }
    })
  }

  openEditActivityModal(data:any): void {
    this.activityId=''
    this.showEditActivityModal = true;
    this.activityId=data.id_t3_sys_business_activity
    this.newActivity = data.t3_sys_business_activity_name;
    this.isBranch = data.t3_sys_branch === 'y';
    this.isCompany = data.t3_sys_company === 'y';
    this.isSection = data.t3_sys_section === 'y';
    this.isSubSection = data.t3_sys_sub_section === 'y';
  }

  updateActivity(){
    const trimmedActivity = this.newActivity.trim();
    const updateActivityObj = {
      t3_sys_business_activity_name: trimmedActivity,
      t3_sys_company: this.isCompany ? 'y' : 'n',
      t3_sys_branch: this.isBranch ? 'y' : 'n',
      t3_sys_section: this.isSection ? 'y' : 'n',
      t3_sys_sub_section: this.isSubSection ? 'y' : 'n',
      id_t3_sys_business_activity:this.activityId
    };

    this.buisnessActService.updateSysBuisnessActivity(updateActivityObj).subscribe({
      next:res=>{
        if(res.status==200){
          this.getBuisnessActivity();
          this.closeAddActivityModal();
          this.updatePaginatedOrders();
          this.sweetalert.showToast('success','Updated Successfully');
        }
        else{
          this.sweetalert.showToast('error',res.message);
        }
      },
      error:error=>{
        console.log(error);
        this.sweetalert.showToast('error', 'Something went wrong!');
      }
    })
  }
  

  deleteActivity(activityId: string): void {
    console.log(activityId);
    
  Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        this.buisnessActService.deleteSysBuisnessActivity(activityId).subscribe({
          next:res=>{
            if(res.status==200){
              this.getBuisnessActivity();
              this.updatePaginatedOrders();
              this.sweetalert.showToast('success', 'Business Activity removed successfully!');
            }
            else{
              this.sweetalert.showToast('error', res.message);
            }
          },
          error:error=>{
            console.log(error);
            this.sweetalert.showToast('error', 'Something went wrong!');
          }
        });
      }
    });
    
  }

  isSelected(activity: string): boolean {
    return this.selectedActivities.includes(activity);
  }

  onSubmit(): void {
    if (this.selectedActivities.length > 0) {
      this.sweetalert.showToast('success', 'System Business Activities Saved Successfully!');
    }
  }
}
