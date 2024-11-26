import { Component, ComponentFactoryResolver, ViewChild, ViewContainerRef } from '@angular/core';
import { AddpopupComponent } from './addpopup/addpopup.component';

@Component({
  selector: 'app-indexpage',
  templateUrl: './indexpage.component.html',
  styleUrl: './indexpage.component.css'
})
export class IndexpageComponent {
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

  itemsPerPage = 2;
  currentPage = 1;
  paginatedOrders = this.orders.slice(0, this.itemsPerPage);

  get totalPages(): number {
    return Math.ceil(this.orders.length / this.itemsPerPage);
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

constructor(private componentFactoryResolver: ComponentFactoryResolver) {}

openAddCompany() {
  // Clear previous components if necessary
  this.popupContainer.clear();

  // Create a component factory for AddCompanyComponent
  const factory = this.componentFactoryResolver.resolveComponentFactory(AddpopupComponent);

  // Create the component dynamically
  const componentRef = this.popupContainer.createComponent(factory);

  // Listen to events or data changes if necessary
  componentRef.instance.closePopup = () => {
    this.popupContainer.clear();
  };
}

}
