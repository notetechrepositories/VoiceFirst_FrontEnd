import { Component, ComponentFactoryResolver, ViewChild, ViewContainerRef } from '@angular/core';
import { UserService } from '../../../../Services/userService/user.service';
import { SweetalertService } from '../../../../Services/sweetAlertService/sweetalert.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { EmployeeAddComponent } from './employee-add/employee-add.component';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrl: './employee.component.css'
})
export class EmployeeComponent {

  constructor
    (private componentFactoryResolver: ComponentFactoryResolver,
    private sweetalert:SweetalertService,
    private userService: UserService,
    private router:Router) {}
    ngOnInit(){
      
      this.getAllEmployee();
      
    }
    employees:any[]=[];
    filteredEmployees:any[]=[];
    paginatedEmployees:any[]=[];
    itemsPerPage:number=2;
    currentPage:number = 1;
    
    
    getAllEmployee(){
      const filterCompany = {
        filters: {},
      };
      this.userService.getUserDetails(filterCompany).subscribe({
        next:(res)=>{
          if(res.status==200){
            console.log("received employees",res.data.Items);
            
            this.employees=res.data.Items;
            this.filteredEmployees = [...this.employees];
            this.paginatedEmployees = this.filteredEmployees.slice(0, this.itemsPerPage);
            console.log("Companies are",this.employees);
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
      return Math.ceil(this.filteredEmployees.length / this.itemsPerPage);
    }
    companyViewObj:any;
    EmployeeView(employee:any){
      console.log(employee);
  
      this.router.navigate(['/components/employee/employee-view'], {
        state: { employee },
      });
      
    }
    // getStatusClass(is_active_till_date: Date): string {
    //   const currentDate = new Date(); // Get the current date
    //   const tillDate = new Date(is_active_till_date); // Convert to Date object if not already
    //   // Compare the dates
    //   if (tillDate <= currentDate) 
    //     return 'status-inactive'; // Inactive
    //   else{
    //     return 'status-active';
    //   }
    // }
    // getFormattedDate(date: string | Date): string {
    //   const parsedDate = new Date(date);
    //   return parsedDate.toLocaleDateString('en-GB'); // Format as DD/MM/YYYY
    // }
    
  
    // getStatusText(is_active_till_date: Date): string{
    //   const currentDate = new Date();
    //   const tillDate = new Date(is_active_till_date);
    //   return tillDate >= currentDate ? 'Active' : 'Inactive';
    // }
    // getActiveStatusClass(is_active: number):string{
    //   return is_active== 1 ? 'badge-success' : 'badge-danger';
  
    // }
    // getActiveStatusText(is_active: number){
    //   return is_active== 1 ? 'Active': 'Inactive';
    // }
  
    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.currentPage++;
        this.updatePaginatedEmployees();
      }
    }
  
    previousPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
        this.updatePaginatedEmployees();
      }
    }
  
    updatePaginatedEmployees() {
      const start = (this.currentPage - 1) * this.itemsPerPage;
      const end = start + this.itemsPerPage;
      this.paginatedEmployees = this.filteredEmployees.slice(start, end);
    }
  
    // ----------------------
  
    searchTerm = '';
    filterDate = '';
    filterStatus:number|null=null;
    
  
  applyFilters() {
    let temporaryEmployees = [...this.employees];
  
    // Filter by search term
    if (this.searchTerm) {
      console.log("search term checked");
      const search = this.searchTerm.toLowerCase();
      temporaryEmployees = temporaryEmployees.filter(
        (employee) =>
          employee.t5_first_name.toLowerCase().includes(search) ||
          employee.t5_email.toLowerCase().includes(search)
      );
    }
  
    // Filter by date
    // if (this.filterDate) {
    //   orders = orders.filter(
    //     (order) => new Date(order.orderDate).toDateString() === new Date(this.filterDate).toDateString()
    //   );
    // }
  
    // Filter by status
    // if (this.filterStatus) {
    //   console.log("status checked",this.filterStatus);
      
    //   temporaryEmployees = temporaryEmployees.filter(
    //     (employee) => employee.is_active === Number(this.filterStatus)
    //   );
    // }
  
    this.filteredEmployees = temporaryEmployees;
    console.log(this.filteredEmployees);
    this.updatePaginatedEmployees();
  }
  //-----------------------------Comapany ViewMore----------------------------------
  
  
  
  
  // ----------------------------------POP UP----------------------------------------
  
  
  @ViewChild('popupContainer', { read: ViewContainerRef })
  popupContainer!: ViewContainerRef;
  
  
  
  openAddEmployee() {
    // Clear previous components if necessary
    this.popupContainer.clear();
  
    // Create a component factory for AddCompanyComponent
    const factory = this.componentFactoryResolver.resolveComponentFactory(EmployeeAddComponent);
  
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
