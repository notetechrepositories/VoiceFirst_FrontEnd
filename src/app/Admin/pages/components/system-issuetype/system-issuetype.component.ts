import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { ConstantService } from '../../../../Services/constantService/constant.service';
import { SweetalertService } from '../../../../Services/sweetAlertService/sweetalert.service';
import { SelectionValues } from '../constant/selection-values/selection-values.component';
import { IssueService } from '../../../../Services/issueService/issue.service';

@Component({
  selector: 'app-system-issuetype',
  templateUrl: './system-issuetype.component.html',
  styleUrl: './system-issuetype.component.css'
})
export class SystemIssuetypeComponent {
    issueTypeForm: FormGroup;
    issueTypeEditForm:FormGroup;
    isPopupVisible:boolean=false;
    isEditVisible:boolean=false;
    isLoading: boolean = false;
    issueTypeList:any[]=[];
    constructor(
      private sweetalert:SweetalertService,
      private router:Router,
      private fb: FormBuilder,
      private issueService:IssueService
    ) {
      this.issueTypeForm = this.fb.group({
        issue_name: ['', [Validators.required]],
      });

      this.issueTypeEditForm = this.fb.group({
        issue_name: ['', [Validators.required]],
        issue_type_id: ['', [Validators.required]]
      });
    }

    ngOnInit(): void {
      this.getSysIssueType()
    }
  // -----------------------------------------design----------------------------------------------------------------------------------
  
    itemsPerPage = 10;
    currentPage = 1;
    paginatedOrders = this.issueTypeList.slice(0, this.itemsPerPage);
  
    get totalPages(): number {
      return Math.ceil(this.issueTypeList.length / this.itemsPerPage);
    }
  
    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.currentPage++;
        this.updatePaginatedOrders();
      }
    }
    
    
    previousPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
        this.updatePaginatedOrders();
      }
    }
    updatePaginatedOrders() {
      const start = (this.currentPage - 1) * this.itemsPerPage;
      const end = start + this.itemsPerPage;
      this.paginatedOrders = this.issueTypeList.slice(start, end);
      
    }
  
    // ----------------------
  
    searchTerm = '';
    filterDate = '';
    filterStatus = '';
    filteredOrders = [...this.issueTypeList];
  
    applyFilters() {
      let selections = [...this.issueTypeList];
      if (this.searchTerm) {
        selections = selections.filter((selection) =>
          selection.t4_1_selection_values_name
            .toLowerCase()
            .includes(this.searchTerm.toLowerCase())
        );
      }
      this.filteredOrders = selections;
      this.updatePaginatedOrders();
    } 

  
  // ----------------------------------POP UP----------------------------------------
  
  getSysIssueType(){

    const filter = {
      filters: {},
    };

    this.issueService.getAllSysIssuetype(filter).subscribe({
      next: (res:any) => {
        console.log(res);
        
      if(res.status==200){
        this.onClose();
        this.issueTypeList=res.data.Items
        console.log(this.issueTypeList);
        
        this.filteredOrders=this.issueTypeList;
        this.updatePaginatedOrders();
      }
      else{
        this.sweetalert.showToast('error',res);
      }
  
      },
      error: (error) => {
        this.sweetalert.showToast('error','Oops! Something went wrong.');
      }
    });
  }
 
  

  
  onClose() {
    this.isPopupVisible =false;
    this.isEditVisible=false;
    this.issueTypeForm.reset();
    this.issueTypeEditForm.reset();
  }
  togglePopup() {
    this.isPopupVisible =true;
  }

  onSubmit():void {
    const data=this.issueTypeForm.value;
    console.log(data);
    this.issueService.addSysIssueType(data).subscribe({
      next: (res:any) => {
      if(res.status ===200){
        this.sweetalert.showToast('success',' Added Succesfully!');
        this.onClose();
       
        this.issueTypeForm.reset();
      }
      else{
        this.sweetalert.showToast('error',res.message);
      }
      },
      error: error => {
        this.sweetalert.showToast('error','Oops! Something went wrong.');
      }
    });
  }
 

  updatePopup(data:any) {
    this.isEditVisible=true;
    this.issueTypeEditForm.patchValue({
      issue_name:data.issue_name,
      issue_type_id: data.issue_type_id
    })
  }

  onSubmitEditIssuetype(){
    const data=this.issueTypeEditForm.value;
    console.log(data);
    this.issueService.updateSysIssueType(data).subscribe({
      next: (res:any) => {
      if(res.status === 200){
        this.sweetalert.showToast('success','Successfully Updated.');
        this.onClose();
       this.getSysIssueType();
        this.issueTypeForm.reset();
      }
      else{
        this.sweetalert.showToast('error',res.message);
      }
      },
      error: (error) => {
        this.sweetalert.showToast('error','Oops! Something went wrong.');
      }
    });
  }

  deleteFn(id:string){
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
      console.log(id);
      
        this.issueService.deleteSysIssueType(id).subscribe({
          next: (res:any) => {
            console.log(result);
            
          if(res.status ===200){
            this.sweetalert.showToast('success','Succefully deleted');
            this.onClose();
           this.getSysIssueType();
            this.issueTypeForm.reset();
          }
          else{
            this.sweetalert.showToast('error',res.message);
          }
          },
          error: (error) => {
            this.sweetalert.showToast('error','Oops! Something went wrong.');
          }
        });
      }
    });
  }

  
}
