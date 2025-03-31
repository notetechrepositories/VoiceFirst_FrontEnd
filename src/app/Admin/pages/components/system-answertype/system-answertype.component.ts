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
         this.getAllSysAnswertype()
       }
     // -----------------------------------------design----------------------------------------------------------------------------------
     
       itemsPerPage = 10;
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
     
     getAllSysAnswertype(){
   
       const filter = {
         filters: {},
       };
   
       this.issueService.getAllSysAnswertype(filter).subscribe({
         next: (res:any) => {
         if(res){
        console.log(res);
        
           this.onClose();
            this.answerTypeList=res.data.Items
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
       this.issueService.addSysAnswerType(data).subscribe({
         next: (res:any) => {
          console.log(res);
          
         if(res.status ===200 ){
           this.sweetalert.showToast('success','Successfully created.');
           this.onClose();
          this.getAllSysAnswertype();
           this.answerTypeForm.reset();
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
    
   
     updatePopup(data:any) {
       this.isEditVisible=true;
       this.answerTypeEditForm.patchValue({
         answer_type:data.answer_type,
         issue_type_answer_id: data.issue_type_answer_id
       })
     }
   
     onSubmitEditIssuetype(){
       const data=this.answerTypeEditForm.value;
       console.log(data);
       
       this.issueService.updateSysAnswerType(data).subscribe({
         next: (res:any) => {
         if(res.status === 200){
           this.sweetalert.showToast('success','Successfully Updated.');
           this.onClose();
           this.getAllSysAnswertype();
           this.answerTypeForm.reset();
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
          
           this.issueService.deleteSysAnswerType(id).subscribe({
             next: (res:any) => {
              console.log(res);
              
             if(res.status === 200){
              this.sweetalert.showToast('success','Succefully deleted');
               this.onClose();
               this.getAllSysAnswertype();
               this.answerTypeForm.reset();
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
