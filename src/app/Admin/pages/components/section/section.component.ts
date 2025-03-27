import { Component} from '@angular/core';
import Swal from 'sweetalert2';
import { SweetalertService } from '../../../../Services/sweetAlertService/sweetalert.service';
import { SectionService } from '../../../../Services/section.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-section',
  templateUrl: './section.component.html',
  styleUrl: './section.component.css'
})
export class SectionComponent {

  showAddModal:boolean=false;
  section:any[]=[];
  filteredSection:any[]=[];
  paginatedSection:any[]=[];
  sectionForm!:FormGroup
  itemsPerPage = 7;
  currentPage = 1;
  searchTerm = '';
  filterDate = '';
  filterStatus = '';

  constructor(
    private sweetalert: SweetalertService,
    private sectionService: SectionService,
    private fb:FormBuilder
  ) { }

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

  // =======================================================================================================

  async ngOnInit(): Promise<void> {
    await this.getSection();
    this.formInit();
  }

  getSection(){
    const body = { 
        filters: { 
          is_delete: "0" 
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


 
}
