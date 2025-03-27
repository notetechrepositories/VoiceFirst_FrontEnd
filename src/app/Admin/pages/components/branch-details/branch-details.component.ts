import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { SweetalertService } from '../../../../Services/sweetAlertService/sweetalert.service';
import { SectionService } from '../../../../Services/section.service';
import Swal from 'sweetalert2';
import { BrachService } from '../../../../Services/branchService/brach.service';

@Component({
  selector: 'app-branch-details',
  templateUrl: './branch-details.component.html',
  styleUrl: './branch-details.component.css'
})
export class BranchDetailsComponent {

  branchId!:string;
  showAddModal:boolean=false;
  section:any[]=[];
  filteredSection:any[]=[];
  paginatedSection:any[]=[];
  sectionForm!:FormGroup;
  branchDetails:any;
  itemsPerPage = 7;
  currentPage = 1;
  searchTerm = '';
  filterDate = '';
  filterStatus = '';

  constructor(
    private route: ActivatedRoute,
    private sweetalert: SweetalertService,
    private sectionService: SectionService,
    private fb:FormBuilder,
    private branchservice:BrachService

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
      this.sectionForm = this.fb.group({
        id_t2_company_branch: ['', [Validators.required]],
        section_name: ['', [Validators.required]],
      });
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

  getSection(){
      const body = { 
          filters: { 
            id_t2_company_branch: this.branchId
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
    }

    submitAddSection(){
      this.sectionForm.patchValue({
        id_t2_company_branch:this.branchId 
      });

      const formvalue=this.sectionForm.value;

      this.sectionService.addSection(formvalue).subscribe({
        next:res=>{
          console.log(res);
          if(res.status==true){
            this.sweetalert.showToast('success','Section Added Succesfully!');
            this.getSection();
          }
          
        },
        error:error=>{
          console.log(error);
          
        }
      })
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

    getBranchById(id:string) {
      const body = {
        filters: {},
        id:id
      };
      this.branchservice.getBranchById(body).subscribe({
        next: (res) => {
          console.log(res);
          // this.branchDetails=res.data.Items;
        }
      })
    }


  
  
}
