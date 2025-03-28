import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { ConstantService } from '../../../../Services/constantService/constant.service';
import { SweetalertService } from '../../../../Services/sweetAlertService/sweetalert.service';
import { IssueService } from '../../../../Services/issueService/issue.service';

@Component({
  selector: 'app-system-answertype',
  templateUrl: './system-answertype.component.html',
  styleUrl: './system-answertype.component.css'
})
export class SystemAnswertypeComponent {
       answerTypeForm: FormGroup;
       answerTypeEditForm:FormGroup;
       isPopupVisible:boolean=false;
       isEditVisible:boolean=false;
       isLoading: boolean = false;
       answerTypeList:any[]=[];
       constructor(
         private sweetalert:SweetalertService,
         private router:Router,
         private fb: FormBuilder,
         private issueService:IssueService
       ) {
         this.answerTypeForm = this.fb.group({
           answer_type: ['', [Validators.required]],
         });
   
         this.answerTypeEditForm = this.fb.group({
           answer_type: ['', [Validators.required]],
           issue_type_answer_id: ['', [Validators.required]]
         });
       }
   
       ngOnInit(): void {
         this.getSysIssueType()
       }
     // -----------------------------------------design----------------------------------------------------------------------------------
     
       itemsPerPage = 5;
       currentPage = 1;
       paginatedOrders = this.answerTypeList.slice(0, this.itemsPerPage);
     
       get totalPages(): number {
         return Math.ceil(this.answerTypeList.length / this.itemsPerPage);
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
         this.paginatedOrders = this.answerTypeList.slice(start, end);
       }
     
       // ----------------------
     
       searchTerm = '';
       filterDate = '';
       filterStatus = '';
       filteredOrders = [...this.answerTypeList];
     
       applyFilters() {
         let selections = [...this.answerTypeList];
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
         next: (res) => {
           console.log(res);
           
         if(res){
           this.sweetalert.showToast('success','Successfully created.');
           this.onClose();
           // this.answerTypeList=res
           this.filteredOrders=this.answerTypeList;
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
       this.answerTypeForm.reset();
       this.answerTypeEditForm.reset();
     }
     togglePopup() {
       this.isPopupVisible =true;
     }
   
     onSubmit():void {
       const data=this.answerTypeForm.value;
       console.log(data);
       this.issueService.addSysIssueType(data).subscribe({
         next: (res) => {
         // if(res.status =="Success"){
         //   this.sweetalert.showToast('success','Successfully created.');
         //   this.onClose();
          
         //   this.answerTypeForm.reset();
         // }
         // else{
         //   this.sweetalert.showToast('error',response.message);
         // }
         },
         error: (error) => {
           this.sweetalert.showToast('error','Oops! Something went wrong.');
         }
       });
     }
    
   
     updatePopup(data:any) {
       this.isEditVisible=true;
       this.answerTypeEditForm.patchValue({
         answer_type:data.answer_type,
         issue_type_answer_id: data.issue_type_answer_id
       })
     }
   
     onSubmitEditIssuetype(){
       const data=this.answerTypeEditForm.value;
       this.issueService.updateSysIssueType(data).subscribe({
         next: (res) => {
         // if(res.status =="Success"){
         //   this.sweetalert.showToast('success','Successfully created.');
         //   this.onClose();
          
         //   this.answerTypeForm.reset();
         // }
         // else{
         //   this.sweetalert.showToast('error',response.message);
         // }
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
           this.sweetalert.showToast('success','Succefully deleted');
           this.issueService.deleteSysIssueType(id).subscribe({
             next: (res) => {
             // if(res.status =="Success"){
             //   this.sweetalert.showToast('success','Successfully created.');
             //   this.onClose();
              
             //   this.answerTypeForm.reset();
             // }
             // else{
             //   this.sweetalert.showToast('error',response.message);
             // }
             },
             error: (error) => {
               this.sweetalert.showToast('error','Oops! Something went wrong.');
             }
           });
         }
       });
     }
}
