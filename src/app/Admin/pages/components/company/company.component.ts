import { Component, ComponentFactoryResolver, ViewChild, ViewContainerRef } from '@angular/core';
import { CompanyAddComponent } from './company-add/company-add.component';
import { SweetalertService } from '../../../../Services/sweetAlertService/sweetalert.service';
import { FormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { Company } from '../../../Models/company_model';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrl: './company.component.css'
})
export class CompanyComponent {
  constructor(private componentFactoryResolver: ComponentFactoryResolver,private sweetalert:SweetalertService) {}

  companies = [
    {
      id: '1',
      companyName: 'Suzuki',
      companyType: 'Vehicle',
      status: 'active'
    },

    {
      id: '2',
      companyName: 'KFC',
      companyType: 'Restaurant',
      status: 'inactive'
    },

    {
      id: '3',
      companyName: 'Kalyan',
      companyType: 'multicompany group',
      status: 'inactive'
    },
    {
      id: '4',
      companyName: 'Aryas',
      companyType: 'Restaurant',
      status: 'active'
    },
    {
      id: '5',
      companyName: 'Reliance',
      companyType: 'multicompany group',
      status: 'active'
    },
    {
      id: '6',
      companyName: 'Lulu',
      companyType: 'multicompany group',
      status: 'active'
    }
  ];
  filteredCompanies = [...this.companies];
  itemsPerPage = 2;
  currentPage = 1;
  paginatedCompanies = this.filteredCompanies.slice(0, this.itemsPerPage);

  get totalPages(): number {
    return Math.ceil(this.filteredCompanies.length / this.itemsPerPage);
  }

  getStatusClass(status: string): string {
    switch (status) {
      case 'active':
        return 'badge-success';
      case 'inactive':
        return 'badge-danger';
      default:
        return 'badge-light';
    }
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
  filterStatus = '';
  

applyFilters() {
  let temporaryCompanies = [...this.companies];

  // Filter by search term
  if (this.searchTerm) {
    console.log("search term checked");
    const search = this.searchTerm.toLowerCase();
    temporaryCompanies = temporaryCompanies.filter(
      (company) =>
        company.companyName.toLowerCase().includes(search) ||
      company.companyType.toLowerCase().includes(search)
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
    console.log("status checked");
    temporaryCompanies = temporaryCompanies.filter(
      (company) => company.status === this.filterStatus
    );
  }

  this.filteredCompanies = temporaryCompanies;
  console.log(this.filteredCompanies);
  this.updatePaginatedCompanies();
}


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
