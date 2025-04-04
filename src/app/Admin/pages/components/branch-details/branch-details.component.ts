import { Component, ComponentFactoryResolver, ViewChild, ViewContainerRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SweetalertService } from '../../../../Services/sweetAlertService/sweetalert.service';
import { SectionService } from '../../../../Services/section.service';
import Swal from 'sweetalert2';
import { BrachService } from '../../../../Services/branchService/brach.service';
import { EditBranchComponent } from '../branch/edit-branch/edit-branch.component';

@Component({
  selector: 'app-branch-details',
  templateUrl: './branch-details.component.html',
  styleUrl: './branch-details.component.css'
})
export class BranchDetailsComponent {

  branchId!:string;
  showAddModal:boolean=false;
  showEditPopup:boolean=false;
  section:any[]=[];
  filteredSection:any[]=[];
  paginatedSection:any[]=[];
  sectionForm!:FormGroup;
  sectionEditForm!:FormGroup;
  branchDetails:any;
  itemsPerPage = 7;
  currentPage = 1;
  searchTerm = '';
  filterDate = '';
  filterStatus = '';

  constructor(
  private componentFactoryResolver: ComponentFactoryResolver,
    private route: ActivatedRoute,
    private sweetalert: SweetalertService,
    private sectionService: SectionService,
    private fb:FormBuilder,
    private branchservice:BrachService,
       private router:Router
   

  ) {}

   paginatedOrders = this.section.slice(0, this.itemsPerPage);
  
    get totalPages(): number {
      return Math.ceil(this.section.length / this.itemsPerPage);
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
      this.paginatedOrders = this.section.slice(start, end);
    }
  
    
    applyFilters() {
      let orders = [...this.section];
      if (this.searchTerm) {
        const search = this.searchTerm.toLowerCase();
        orders = orders.filter(
          (order) =>
            order.branchName.toLowerCase().includes(search)
        );
      }
  
      if (this.filterDate) {
        orders = orders.filter(
          (order) => new Date(order.country).toDateString() === new Date(this.filterDate).toDateString()
        );
      }
      this.updatePaginatedOrders();
    }
  
   

    // ===================================================

  async ngOnInit(): Promise<void> {
    const id = this.route.snapshot.paramMap.get('id');
    if(id){
      this.branchId=id;
      this.getBranchById(this.branchId);
      console.log(this.branchId);
    }
    await this.getSection();
    this.formInit();
  }

  formInit(){
    this.sectionForm = this.fb.group({
      id_t2_company_branch: ['', [Validators.required]],
      section_name: ['', [Validators.required]],
    });

    this.sectionEditForm = this.fb.group({
      id_t2_company_branch: ['', [Validators.required]],
      section_name: ['', [Validators.required]],
      id_t3_branch_section: ['', [Validators.required]],
    });
  }

  getSection(){
      const body = { 
          filters: { 
            // id_t2_company_branch: this.branchId
          }
        }; 
      this.sectionService.getSection(body).subscribe({
        next:res=>{
          this.section=res.data.Items;
          console.log(this.section);
          this.filteredSection = [...this.section];
          this.paginatedSection = this.filteredSection.slice(0, this.itemsPerPage);
          
        },
        error:error=>{
          console.log(error);
        }
      })
    }
  
    openAddSection(){
      this.showAddModal=true;
    }
  
    closeModal(){
      this.showAddModal=false;
      this.showEditPopup=false;
      this.sectionForm.reset();
      this.sectionEditForm.reset();
    }
    goToSectionDetails(id:any){
      this.router.navigate(['company/section-details',id]);
    }

    submitAddSection(){
      this.sectionForm.patchValue({
        id_t2_company_branch:this.branchId 
      });
      const formvalue=this.sectionForm.value;
      this.sectionService.addSection(formvalue).subscribe({
        next:res=>{
          console.log(res);
          if(res.status==200){
            
            this.getSection();
            this.closeModal();
            this.sweetalert.showToast('success','Section Added Succesfully!');
          }
          else{
            this.sweetalert.showToast('error',res.message);
          }
        },
        error:error=>{
          console.log(error);
          this.sweetalert.showToast('error','Something went wrong!');
        }
      })
    }



    openEdit(data:any){
      this.showEditPopup=true;
      console.log(data);
      this.sectionEditForm.patchValue({
        id_t2_company_branch: data.id_t2_company_branch,
        section_name: data.section_name,
        id_t3_branch_section: data.id_t3_branch_section
      })
    }

    submitEditSection(){
      const formdata=this.sectionEditForm.value;
      this.sectionService.updateSection(formdata).subscribe({
        next:res=>{
          console.log(res);
          if(res.status){
            this.closeModal();
            this.getSection();
            this.sweetalert.showToast('success','Updated!');
          }
          else{
            this.sweetalert.showToast('error',res.message);
          }
        },
        error:error=>{
          console.log(error);
          this.sweetalert.showToast('error','Something went wrong!');
        }
      })
    }
  
   
  
    deleteSection(id: any) {
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
   
           this.sectionService.deleteSection(id).subscribe({
             next: (res) => {
               if (res.message == "Success") {
                 this.sweetalert.showToast('success', 'Succefully deleted');
                 //this.paginatedOrders = this.locations.filter(item => item.id_t2_1_country !== id);
                 this.getSection();
               }
             },
             error: (error) => {
               this.sweetalert.showToast('error', 'Oops! Something went wrong.');
             },
           });
   
         }
       });
    }




    // =====================Branch==========================

    getBranchById(id:string) {
      const body = {
        filters: {},
        id:id
      };
      this.branchservice.getBranchById(body).subscribe({
        next: (res) => {
          console.log(res);
          if (res && res.data && res.data.Items) {
            this.branchDetails = res.data.Items; // Store API response in variable
          }
          // this.branchDetails=res.data.Items;
        }
      })
    }
    
      @ViewChild('popupContainer', { read: ViewContainerRef })
      popupContainer!: ViewContainerRef;
    openEditPopup(branch:any){
       this.popupContainer.clear();
          const factory = this.componentFactoryResolver.resolveComponentFactory(EditBranchComponent);
          const componentRef = this.popupContainer.createComponent(factory);
          componentRef.instance.branchData = branch;
          componentRef.instance.closePopup = () => {
            this.popupContainer.clear();
          
          };
      
      
    }

  
  
}
