import { Component, ComponentFactoryResolver, ElementRef, Input, Pipe, ViewChild, ViewContainerRef } from '@angular/core';
import { CompanyAddComponent } from './company-add/company-add.component';
import { SweetalertService } from '../../../../Services/sweetAlertService/sweetalert.service';
import { FormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { Company } from '../../../Models/company_model';
import { CompanyService } from '../../../../Services/companyService/company.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { CompanyViewComponent } from './company-view/company-view.component';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrl: './company.component.css'
})
export class CompanyComponent {
  constructor
  (private componentFactoryResolver: ComponentFactoryResolver,
  private sweetalert:SweetalertService,
  private companyService: CompanyService,
  private router:Router) {}
  ngOnInit(){
    
    this.getAllCompany();
    
  }
  companies:any[]=[];
  filteredCompanies:any[]=[];
  paginatedCompanies:any[]=[];
  itemsPerPage:number=2;
  currentPage:number = 1;
  
  
  getAllCompany(){
    const filterCompany = {
      filters: {},
    };
    this.companyService.getCompany(filterCompany).subscribe({
      next:(res)=>{
        if(res.status==200){
          console.log();
          
          this.companies=res.data.Item;
          this.filteredCompanies = [...this.companies];
          this.paginatedCompanies = this.filteredCompanies.slice(0, this.itemsPerPage);
          console.log("Companies are",this.companies);
        }else{
          console.log(res);
        }
      },
      error:(error)=>{
        console.log(error);
        this.sweetalert.showToast('error', 'Oops!Something went wrong');
      },
    });
  }
  
  
  

  get totalPages(): number {
    return Math.ceil(this.filteredCompanies.length / this.itemsPerPage);
  }
  companyViewObj:any;
  companyView(company:any){
    console.log(company);

    this.router.navigate(['/components/company/company-view'], {
      state: { company },
    });
    
  }
  getStatusClass(is_active_till_date: Date): string {
    const currentDate = new Date(); // Get the current date
    const tillDate = new Date(is_active_till_date); // Convert to Date object if not already
    // Compare the dates
    if (tillDate <= currentDate) 
      return 'status-inactive'; // Inactive
    else{
      return 'status-active';
    }
  }
  getFormattedDate(date: string | Date): string {
    const parsedDate = new Date(date);
    return parsedDate.toLocaleDateString('en-GB'); // Format as DD/MM/YYYY
  }
  

  getStatusText(is_active_till_date: Date): string{
    const currentDate = new Date();
    const tillDate = new Date(is_active_till_date);
    return tillDate >= currentDate ? 'Active' : 'Inactive';
  }
  getActiveStatusClass(is_active: number):string{
    return is_active== 1 ? 'badge-success' : 'badge-danger';

  }
  getActiveStatusText(is_active: number){
    return is_active== 1 ? 'Active': 'Inactive';
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updatePaginatedCompanies();
    }
  }

  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updatePaginatedCompanies();
    }
  }

  updatePaginatedCompanies() {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    this.paginatedCompanies = this.filteredCompanies.slice(start, end);
  }

  // ----------------------

  searchTerm = '';
  filterDate = '';
  filterStatus:number|null=null;
  

applyFilters() {
  let temporaryCompanies = [...this.companies];

  // Filter by search term
  if (this.searchTerm) {
    console.log("search term checked");
    const search = this.searchTerm.toLowerCase();
    temporaryCompanies = temporaryCompanies.filter(
      (company) =>
        company.t1_company_name.toLowerCase().includes(search) ||
        company.company_type.toLowerCase().includes(search)
    );
  }

  // Filter by date
  // if (this.filterDate) {
  //   orders = orders.filter(
  //     (order) => new Date(order.orderDate).toDateString() === new Date(this.filterDate).toDateString()
  //   );
  // }

  // Filter by status
  if (this.filterStatus) {
    console.log("status checked",this.filterStatus);
    
    temporaryCompanies = temporaryCompanies.filter(
      (company) => company.is_active === Number(this.filterStatus)
    );
  }

  this.filteredCompanies = temporaryCompanies;
  console.log(this.filteredCompanies);
  this.updatePaginatedCompanies();
}
//-----------------------------Comapany ViewMore----------------------------------




// ----------------------------------POP UP----------------------------------------


@ViewChild('popupContainer', { read: ViewContainerRef })
popupContainer!: ViewContainerRef;



openAddCompany() {
  // Clear previous components if necessary
  this.popupContainer.clear();

  // Create a component factory for AddCompanyComponent
  const factory = this.componentFactoryResolver.resolveComponentFactory(CompanyAddComponent);

  // Create the component dynamically
  const componentRef = this.popupContainer.createComponent(factory);

  // Listen to events or data changes if necessary
   componentRef.instance.closePopup = () => {
     this.popupContainer.clear();
   };
}

show() {
  this.sweetalert.success()
}

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


  

}
