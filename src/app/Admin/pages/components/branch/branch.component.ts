import { Component, ComponentFactoryResolver, Input, ViewChild, ViewContainerRef } from '@angular/core';
import { SweetalertService } from '../../../../Services/sweetAlertService/sweetalert.service';
import { Branch } from '../../../Models/branch_model';
import { BrachService } from '../../../../Services/branchService/brach.service';
import { AddBranchComponent } from './add-brach/add-branch/add-branch.component';
import Swal from 'sweetalert2';
import { EditBranchComponent } from './edit-branch/edit-branch.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-branch',
  templateUrl: './branch.component.html',
  styleUrl: './branch.component.css'
})
export class BranchComponent {
  branch: Branch[] = [];
  @Input() branches: any[] = [];
  constructor(private componentFactoryResolver: ComponentFactoryResolver, private sweetalert: SweetalertService,
    private branchservice: BrachService,
    private router:Router
  ) { }

  async ngOnInit(): Promise<void> {
    await this.getBranch();
  }

  itemsPerPage = 7;
  currentPage = 1;
  paginatedOrders = this.branch.slice(0, this.itemsPerPage);

  get totalPages(): number {
    return Math.ceil(this.branch.length / this.itemsPerPage);
  }

  getStatusClass(status: string): string {
    switch (status) {
      case 'DELIVERED':
        return 'badge-success';
      case 'CANCELLED':
        return 'badge-danger';
      case 'PENDING':
        return 'badge-warning';
      case 'RETURNS':
        return 'badge-secondary';
      case 'PICKUPS':
        return 'badge-primary';
      default:
        return 'badge-light';
    }
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
    this.paginatedOrders = this.branch.slice(start, end);
  }

  // ----------------------

  searchTerm = '';
  filterDate = '';
  filterStatus = '';
  filteredOrders = [...this.branch];

  applyFilters() {
    let orders = [...this.branch];

    // Filter by search term
    if (this.searchTerm) {
      const search = this.searchTerm.toLowerCase();
      orders = orders.filter(
        (order) =>
          order.branchName.toLowerCase().includes(search)
      );
    }

    // Filter by date
    if (this.filterDate) {
      orders = orders.filter(
        (order) => new Date(order.country).toDateString() === new Date(this.filterDate).toDateString()
      );
    }

    // Filter by status
    // if (this.filterStatus) {
    //   orders = orders.filter(
    //     (order) => order.deliveryStatus === this.filterStatus
    //   );
    // }

    this.filteredOrders = orders;
    this.updatePaginatedOrders();
  }


  // ----------------------------------POP UP----------------------------------------


  @ViewChild('popupContainer', { read: ViewContainerRef })
  popupContainer!: ViewContainerRef;



  openAddCompany() {
    // Clear previous components if necessary
    this.popupContainer.clear();

    // Create a component factory for AddCompanyComponent
    const factory = this.componentFactoryResolver.resolveComponentFactory(AddBranchComponent);

    // Create the component dynamically
    const componentRef = this.popupContainer.createComponent(factory);

    // Listen to events or data changes if necessary
    componentRef.instance.closePopup = () => {
      this.popupContainer.clear();
      this.getBranch();
    };
  }
  openUpdateCompany() {
    // Clear previous components if necessary
    this.popupContainer.clear();

    // Create a component factory for AddCompanyComponent
    const factory = this.componentFactoryResolver.resolveComponentFactory(EditBranchComponent);

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
        console.log(id);

        this.branchservice.deleteBranch(id).subscribe({
          next: (res) => {
            if (res.message == "Success") {
              this.sweetalert.showToast('success', 'Succefully deleted');
              //this.paginatedOrders = this.locations.filter(item => item.id_t2_1_country !== id);
              this.getBranch();
            }
          },
          error: (error) => {
            this.sweetalert.showToast('error', 'Oops! Something went wrong.');
          },
        });

      }
    });
  }

  successtoast() {
    this.sweetalert.showToast('success', 'Successfully created.');
  }

  updatePopup() {
    console.log("workng");

    (async () => {
      const inputValue = "input value";
      const { value: ipAddress } = await Swal.fire({
        // title: "Enter your IP address",
        input: "text",
        inputLabel: "Division One",
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
        this.sweetalert.showToast('success', 'Successfully created.');
      }
    })()
  }
  // ------------------Get---------------------------
  getBranch(): void {
    // const body = { 
    //   filters: { 

    //   }
    // };

    this.branchservice.getCompanyBranch().subscribe({
      next: (res) => {
        console.log(res);
        this.branch = res.data.Items || [];
        console.log(this.branch);
        
        this.updatePaginatedOrders();
      },
      error: (error) => {
        console.log('Failed to load locations:', error);
        this.branch = [];
        this.updatePaginatedOrders();
      },
    });
  }
  // ------------GetById------------------------------

  getBranchById(id_t2_company_branch: number) {
    const body = {
      filters: {},
      id:id_t2_company_branch
    };
    this.branchservice.getBranchById(body).subscribe({
      next: (response) => {
        console.log(response);

      }
    })
  }

  goToBranchDetails(id:any){
    this.router.navigate(['company/branch-details',id]);
  }
  //----------------Update------------------
  UpdateBranch(branch: any): void {

    this.popupContainer.clear();
    const factory = this.componentFactoryResolver.resolveComponentFactory(EditBranchComponent);
    const componentRef = this.popupContainer.createComponent(factory);
    componentRef.instance.branchData = branch;
    componentRef.instance.closePopup = () => {
      this.popupContainer.clear();
      this.getBranch();
    };



  }
}
