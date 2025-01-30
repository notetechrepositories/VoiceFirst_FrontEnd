import { Component, ComponentFactoryResolver, Output, ViewChild, ViewContainerRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ConstantService } from '../../../../../Services/constantService/constant.service';
import { SweetalertService } from '../../../../../Services/sweetAlertService/sweetalert.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { SelectionValuesComponent } from '../selection-values/selection-values.component';

export interface Selection {
  t4_selection_name:string;
  id_t4_selection:String;
}
@Component({
  selector: 'app-selection',
  templateUrl: './selection.component.html',
  styleUrl: './selection.component.css'
})
export class SelectionComponent {

    selectionForm: FormGroup;
    isPopupVisible:boolean=false;
    selection:Selection[]=[];
    constructor(private componentFactoryResolver: ComponentFactoryResolver,private sweetalert:SweetalertService,
      private router:Router,private fb: FormBuilder,private constantService:ConstantService
    ) {
      this.selectionForm = this.fb.group({
        t4_selection_name: ['', [Validators.required]],
      });
    }

    ngOnInit(): void {
      this.getSelection();
      
    }
  // -----------------------------------------design----------------------------------------------------------------------------------
  
    itemsPerPage = 5;
    currentPage = 1;
    paginatedOrders = this.selection.slice(0, this.itemsPerPage);
  
    get totalPages(): number {
      return Math.ceil(this.selection.length / this.itemsPerPage);
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
      this.paginatedOrders = this.selection.slice(start, end);
    }
  
    // ----------------------
  
    searchTerm = '';
    filterDate = '';
    filterStatus = '';
    filteredOrders = [...this.selection];
  
    applyFilters() {
      let selections = [...this.selection];
      if (this.searchTerm) {
        selections = selections.filter((selection) =>
          selection.t4_selection_name
            .toLowerCase()
            .includes(this.searchTerm.toLowerCase())
        );
      }
      this.filteredOrders = selections;
      this.updatePaginatedOrders();
    } 

  
  // ----------------------------------POP UP----------------------------------------
  
  
  @ViewChild('popupContainer', { read: ViewContainerRef })
  popupContainer!: ViewContainerRef;
  
  deleteFn(){
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
      }
    });
  }
  
  successtoast(){
    this.sweetalert.showToast('success','Successfully created.');
  }
  
   updatePopup() {
    console.log("workng");
    
    (async () => {
      const inputValue = "input value";
      const { value: ipAddress } = await Swal.fire({
        // title: "Enter your IP address",
        input: "text",
        inputLabel: "Selection",
        inputValue,
        confirmButtonText: "Update",
        showCancelButton: true,
        inputValidator: (value) => {
          if (!value) {
            return "You need to write something!";
          }
          return null;
        }
      });
      if (ipAddress) {
        this.sweetalert.showToast('success','Successfully Updated.');
      }
    })()
  }
  // ----Insert Company Types------------------------------------
  
  onSubmit():void {
    const data=this.selectionForm.value;
    console.log(data);
    this.constantService.insertSelection(data).subscribe({
     
      
      next: (response) => {
      if(response.message=="Success"){
        this.sweetalert.showToast('success','Successfully created.');
        this.onClose();
        this.selectionForm.reset();
      }
      else{
        this.sweetalert.showToast('error',response.message);
      }
  
      },
      error: (error) => {
        this.sweetalert.showToast('error','Oops! Something went wrong.');
      }
    });
  }
  onClose() {
    this.isPopupVisible =false;
  }
  togglePopup() {
    this.isPopupVisible =true;
  }
  editSelection(selection:any){
    (async () => {
      const inputValue = selection.t4_selection_name;
      const { value: name } = await Swal.fire({
        input: "text",
        inputLabel: "Selection",
        inputValue,
        confirmButtonText: "Update",
        showCancelButton: true,
        inputValidator: (value) => {
          if (!value) {
            return "You need to write something!";
          }
          return null;
        }
      });
      if (name) {
        const data:any={
          id_t4_selection:selection.id_t4_selection,
          t4_selection_name:name
        }
        
        this.constantService.updateSelection(data).subscribe({
                next: (response) => {
                  if(response.message=="Success"){
                    this.sweetalert.showToast('success','Successfully Updated.');
                   this.getSelection();
                    const index = this.selection.findIndex(item => item.id_t4_selection === data.id_t4_selection);
                      if (index !== -1) {
                        this.selection[index] = { ...this.selection[index], ...data };
                      }
                  }
                  else{
                    this.sweetalert.showToast('error',response.message);
                  }
                },
                error: (error) => {
                  this.sweetalert.showToast('error','Oops! Something went wrong');
                },
              });
        
      }
    })();
  }  

  getSelection(){
    this.constantService.getSelection().subscribe({
      next: (res) => {
        this.selection = res.data.Items || [];
        this.updatePaginatedOrders(); 
      },
      error: (error) => {
        console.error('Failed to load locations:', error);
        this.selection = [];
        this.updatePaginatedOrders(); 
      },
    });
  }
  deleteSelection(id: any): void {
  console.log(id);
  
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
        this.constantService.deleteSelection(id).subscribe({
          next: (res) => {
            if(res.message=="Success"){
              this.sweetalert.showToast('success','Succefully deleted');
              //this.paginatedOrders = this.locations.filter(item => item.id_t2_1_country !== id);
              this.getSelection();
            }
          },
          error: (error) => {
            this.sweetalert.showToast('error','Oops! Something went wrong.');
          },
        });
       
      }
    });
  }
}
