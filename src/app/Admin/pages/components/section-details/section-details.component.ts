import { Component, ComponentFactoryResolver, ViewChild, ViewContainerRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { SweetalertService } from '../../../../Services/sweetAlertService/sweetalert.service';
import { SectionService } from '../../../../Services/section.service';
import { BrachService } from '../../../../Services/branchService/brach.service';
import Swal from 'sweetalert2';
import { SubSectionService } from '../../../../Services/sub-sectionService/sub-section.service';

@Component({
  selector: 'app-section-details',
  templateUrl: './section-details.component.html',
  styleUrl: './section-details.component.css'
})
export class SectionDetailsComponent {
  sectionId!:string;
  showAddModal:boolean=false;
  showEditModal:boolean=false;
  section:any[]=[];
  filteredSection:any[]=[];
  paginatedSection:any[]=[];
  subsectionForm!:FormGroup;
  subsectionEditForm!:FormGroup;
  sectionDetails:any;
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
   private subSectionService:SubSectionService

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
  
    formInit(){
      this.subsectionForm = this.fb.group({
        id_t3_branch_section: ['', [Validators.required]],
        sub_section_name: ['', [Validators.required]],
      });

      this.subsectionEditForm = this.fb.group({
        id_t3_branch_sub_section: ['', [Validators.required]],
        id_t3_branch_section: ['', [Validators.required]],
        sub_section_name: ['', [Validators.required]],
        
      });
    }

    // ===================================================

  async ngOnInit(): Promise<void> {
    const id = this.route.snapshot.paramMap.get('id');
    if(id){
      this.sectionId=id;
      this.getSectionById(this.sectionId);
      console.log(this.sectionId);
    }
    await this.getSubSection();
    this.formInit();
    
  }

  getSubSection(){
      const body = { 
          filters: { 
            // id_t3_branch_section: this.sectionId
          }
        }; 
      this.subSectionService.getSubSection(body).subscribe({
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
      this.showEditModal=false;
      this.subsectionForm.reset();
      this.subsectionEditForm.reset();
    }


    submitAddSubSection(){
      this.subsectionForm.patchValue({
        id_t3_branch_section:this.sectionId 
      });

      const formvalue=this.subsectionForm.value;

      this.subSectionService.addSubSection(formvalue).subscribe({
        next:res=>{
          console.log(res);
          if(res.status===200){
            this.sweetalert.showToast('success','Sub-Section Added Succesfully!');
            this.getSubSection();
            this.closeModal();
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

    submitEditSection(){
      const formdata=this.subsectionEditForm.value;
      console.log(formdata);
      
      this.subSectionService.updateSubsection(formdata).subscribe({
        next:res=>{
          console.log(res);
          if(res.status==200){
            this.sweetalert.showToast('success','Updated!');
            this.closeModal();
            this.getSubSection();
           
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
      this.showEditModal=true;
      console.log(data);

      this.subsectionEditForm.patchValue({
        id_t3_branch_section: data.id_t3_branch_sub_section,
        sub_section_name: data.sub_section_name,
        id_t3_branch_sub_section: data.id_t3_branch_section,

      })
      console.log(this.subsectionEditForm.value);
      
    }

  
   
  
    deleteBranch(id: any) {
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
        
        }
      });
    }




    // =====================Branch==========================

    getSectionById(id:string) {
      const body = {
        filters: {},
        id:id
      };
      this.sectionService.getSectionById(body).subscribe({
        next: (res) => {
          console.log(res);
          if (res && res.data && res.data.Items) {
            this.sectionDetails = res.data.Items; // Store API response in variable
          }
          // this.branchDetails=res.data.Items;
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
       
               this.subSectionService.deleteSubSection(id).subscribe({
                 next: (res) => {
                   if (res.status === 200) {
                     this.sweetalert.showToast('success', 'Succefully deleted');
                     //this.paginatedOrders = this.locations.filter(item => item.id_t2_1_country !== id);
                     this.getSubSection();
                   }
                 },
                 error: (error) => {
                   this.sweetalert.showToast('error', 'Oops! Something went wrong.');
                 },
               });
       
             }
           });
        }
    
    
      @ViewChild('popupContainer', { read: ViewContainerRef })
      popupContainer!: ViewContainerRef;

    openEditPopup(branch:any){
      //  this.popupContainer.clear();
      //     const factory = this.componentFactoryResolver.resolveComponentFactory(EditBranchComponent);
      //     const componentRef = this.popupContainer.createComponent(factory);
      //     componentRef.instance.branchData = branch;
      //     componentRef.instance.closePopup = () => {
      //       this.popupContainer.clear();
          
      //     };
      
      
    }

}
