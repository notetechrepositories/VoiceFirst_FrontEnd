import { Component, ComponentFactoryResolver, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SweetalertService } from '../../../../../Services/sweetAlertService/sweetalert.service';
import { ConstantService } from '../../../../../Services/constant.service';
import Swal from 'sweetalert2';
export interface SelectionValues {
  t4_1_selection_values_name:string;
  id_t4_selection:String;
  id_t4_1_selection_values:string;
}
export interface Selection {
  t4_selection_name:string;
  id_t4_selection:String;
}
@Component({
  selector: 'app-selection-values',
  templateUrl: './selection-values.component.html',
  styleUrl: './selection-values.component.css'
})
export class SelectionValuesComponent {
    selectionForm: FormGroup;
    isPopupVisible:boolean=false;
    selection:Selection[]=[];
    isLoading: boolean = false;
    selectionValues:SelectionValues[]=[];
    constructor(private componentFactoryResolver: ComponentFactoryResolver,private sweetalert:SweetalertService,
      private router:Router,private fb: FormBuilder,private constantService:ConstantService
    ) {
      this.selectionForm = this.fb.group({
        t4_selection_name: ['', [Validators.required]],
      });
    }

    ngOnInit(): void {
      // this.getSelectionValues();
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
  
    // applyFilters() {
    //   let selections = [...this.selection];
    //   if (this.searchTerm) {
    //     selections = selections.filter((selection) =>
    //       selection.t4_1_selection_values_name
    //         .toLowerCase()
    //         .includes(this.searchTerm.toLowerCase())
    //     );
    //   }
    //   this.filteredOrders = selections;
    //   this.updatePaginatedOrders();
    // } 

  
  // ----------------------------------POP UP----------------------------------------
  
  
 
  
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
        this.getSelectionValuesBySelectionId(this.selectionId);
      }
    })()
  }
  // ----Insert Company Types------------------------------------
  
  onSubmit():void {
    const data:any={
      id_t4_selection:this.selectionId,
      t4_1_selection_values_name:this.selectionForm.value.t4_selection_name
    }
    console.log(data);
    this.constantService.insertSelectionValues(data).subscribe({
     
      
      next: (response) => {
      if(response.message=="Success"){
        this.sweetalert.showToast('success','Successfully created.');
        this.onClose();
        this.getSelectionValuesBySelectionId(this.selectionId);
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
      const inputValue = selection.t4_1_selection_values_name;
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
          id_t4_1_selection_values:selection.id_t4_1_selection_values,
          t4_1_selection_values_name:name
        }
        console.log(data);
        
        this.constantService.updateSelectionValues(data).subscribe({
                next: (response) => {
                  if(response.message=="Success"){
                    this.sweetalert.showToast('success','Successfully Updated.');
                    this.getSelectionValuesBySelectionId(this.selectionId);
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

  getSelectionValues(){
    this.constantService.getSelectionValues().subscribe({
      next: (res) => {
        this.selectionValues = res.data.Items || [];
        this.updatePaginatedOrders(); 
      },
      error: (error) => {
        console.error('Failed to load locations:', error);
        this.selectionValues = [];
        this.updatePaginatedOrders(); 
      },
    });
  }
  archiveSelection(id: any): void {
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
        this.constantService.deleteSelectionValues(id).subscribe({
          next: (res) => {
            if(res.message=="Success"){
              this.sweetalert.showToast('success','Succefully deleted');
              //this.paginatedOrders = this.locations.filter(item => item.id_t2_1_country !== id);
              this.getSelectionValues();
            }
          },
          error: (error) => {
            this.sweetalert.showToast('error','Oops! Something went wrong.');
          },
        });
       
      }
    });
  }
  getSelection(){
    this.isLoading=true;
    this.constantService.getSelection().subscribe({
      next: (res) => {
        
        console.log(res);
        this.isLoading=false;
        this.selection = res.data.Items || [];
        console.log( this.selection);
        this.updatePaginatedOrders(); 
      },
      error: (error) => {
        this.isLoading=false;
        console.error('Failed to load locations:', error);
        this.selection = [];
        this.updatePaginatedOrders(); 
      },
    });
  }

selectionId!:string;

  onChangeSelection(event:Event){
    const selectElement = event.target as HTMLSelectElement; 
    const selectionId = selectElement.value;
    this.selectionId=selectElement.value;
    console.log(selectionId);
     
    this.getSelectionValuesBySelectionId(selectionId);
  }

  getSelectionValuesBySelectionId(selectionId:any){
    this.constantService.getSelectionValuesBySelectionId(selectionId).subscribe({
      next: (res) => {
        console.log(res);
        
        this.selectionValues = res.data.Items;
        console.log(this.selectionValues);
        
      },
      error: (error) => {
        console.error('Failed to load Division Two:', error);
      },
    });
  }
}
