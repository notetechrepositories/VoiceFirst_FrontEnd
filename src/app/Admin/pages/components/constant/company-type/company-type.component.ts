import { Component, ComponentFactoryResolver, Output, ViewChild, ViewContainerRef } from '@angular/core';
import { SweetalertService } from '../../../../../Services/sweetAlertService/sweetalert.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-company-type',
  templateUrl: './company-type.component.html',
  styleUrl: './company-type.component.css'
})
export class CompanyTypeComponent {
  companyTypeForm: FormGroup;
  isPopupVisible=false;
   @Output() closePopup = () => {};
   
  constructor(private componentFactoryResolver: ComponentFactoryResolver,private sweetalert:SweetalertService,
    private router:Router,private fb: FormBuilder
  ) {
    this.companyTypeForm = this.fb.group({
      t2_1_country_name: ['', [Validators.required]],
    });
  }
  orders = [
    {
      orderId: '#TBT12',
      customer: 'Louis Hicks',
      productName: 'Leather band Smartwatches',
      amount: 2145.2,
      orderDate: '11 Feb, 2021',
      deliveryDate: '22 Feb, 2021',
      paymentMethod: 'COD',
      deliveryStatus: 'DELIVERED',
    },
    {
      orderId: '#TBT11',
      customer: 'Richard Jenkins',
      productName: 'Innovative Education Book',
      amount: 203.65,
      orderDate: '08 Oct, 2021',
      deliveryDate: '24 Oct, 2021',
      paymentMethod: 'Visa',
      deliveryStatus: 'CANCELLED',
    },
    {
      orderId: '#TBT10',
      customer: 'Edward Rogers',
      productName: 'Apple Headphone',
      amount: 1876.02,
      orderDate: '25 Nov, 2021',
      deliveryDate: '03 Dec, 2021',
      paymentMethod: 'COD',
      deliveryStatus: 'RETURNS',
    },
    {
      orderId: '#TBT9',
      customer: 'Alina Holland',
      productName: 'Borosil Paper Cup',
      amount: 351.91,
      orderDate: '19 June, 2021',
      deliveryDate: '28 June, 2021',
      paymentMethod: 'Visa',
      deliveryStatus: 'PENDING',
    },
    {
      orderId: '#TBT8',
      customer: 'Theresa Crawford',
      productName: 'Galaxy Watch4',
      amount: 3468.41,
      orderDate: '28 Oct, 2022',
      deliveryDate: '09 Nov, 2022',
      paymentMethod: 'Mastercard',
      deliveryStatus: 'PICKUPS',
    },
  ];

// -----------------------------------------design----------------------------------------------------------------------------------
  // orders:any=[];
  itemsPerPage = 2;
  currentPage = 1;
  paginatedOrders = this.orders.slice(0, this.itemsPerPage);

  get totalPages(): number {
    return Math.ceil(this.orders.length / this.itemsPerPage);
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
    this.paginatedOrders = this.orders.slice(start, end);
  }

  // ----------------------

  searchTerm = '';
  filterDate = '';
  filterStatus = '';
  filteredOrders = [...this.orders];

applyFilters() {
  let orders = [...this.orders];

  // Filter by search term
  if (this.searchTerm) {
    const search = this.searchTerm.toLowerCase();
    orders = orders.filter(
      (order) =>
        order.customer.toLowerCase().includes(search) ||
        order.productName.toLowerCase().includes(search)
    );
  }

  // Filter by date
  if (this.filterDate) {
    orders = orders.filter(
      (order) => new Date(order.orderDate).toDateString() === new Date(this.filterDate).toDateString()
    );
  }

  // Filter by status
  if (this.filterStatus) {
    orders = orders.filter(
      (order) => order.deliveryStatus === this.filterStatus
    );
  }

  this.filteredOrders = orders;
  this.updatePaginatedOrders();
}


// ----------------------------------POP UP----------------------------------------


@ViewChild('popupContainer', { read: ViewContainerRef })
popupContainer!: ViewContainerRef;



// openAddCompany() {
//   // Clear previous components if necessary
//   this.popupContainer.clear();

//   // Create a component factory for AddCompanyComponent
//   const factory = this.componentFactoryResolver.resolveComponentFactory();

//   // Create the component dynamically
//   const componentRef = this.popupContainer.createComponent(factory);

//   // Listen to events or data changes if necessary
//   componentRef.instance.closePopup = () => {
//     this.popupContainer.clear();
//   };
// }

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
      this.sweetalert.showToast('success','Successfully created.');
    }
  })()
}
// ----Insert Company Types------------------------------------

onSubmit():void {
  // const data=this.companyTypeForm.value;
  // this.countryService.insertCountry(data).subscribe({
  //   next: (response) => {
  //   if(response.message=="Success"){
  //     this.sweetalert.showToast('success','Successfully created.');
  //     this.closePopup();
  //     this.locationForm.reset();
  //   }
  //   else{
  //     this.sweetalert.showToast('error',response.message);
  //   }

  //   },
  //   error: (error) => {
  //     this.sweetalert.showToast('error','Oops! Something went wrong.');
  //   }
  // });
}
onClose() {
  this.closePopup();
  this.router.navigate(['/components/company-type'])
}
togglePopup(state: boolean) {
  this.isPopupVisible = state;
}
editCompanyType(){
  // const data=this.locationForm.value;
  // this.countryService.updateCountry(data).subscribe({
  //   next: (response) => {
  //     if(response.message=="Success"){
  //       this.sweetalert.showToast('success','Successfully created.');
  //       this.closePopup();
  //       this.locationForm.reset();
  //     }
  //     else{
  //       this.sweetalert.showToast('error',response.message);
  //     }
  //   },
  //   error: (error) => {
  //     console.error('Error adding location:', error);
  //     alert('Failed to add location.');
  //   },
  // });
}  

}
