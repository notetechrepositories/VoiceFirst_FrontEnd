import { Component, ComponentFactoryResolver, Input, ViewChild, ViewContainerRef } from '@angular/core';
import * as XLSX from 'xlsx';
import { ReactiveFormsModule, FormBuilder,FormControl, FormGroup, Validators } from '@angular/forms';
import { CreateCountryComponent } from './create-country/create-country.component';
import { EditCountryComponent } from './edit-country/edit-country.component';
import { Division1Component } from './division1/division1.component';
import { CountryService } from '../../../../Services/countryService/country.service';
import { Division2Component } from './division2/division2.component';
import { Division3Component } from './division3/division3.component';
import { SweetalertService } from '../../../../Services/sweetAlertService/sweetalert.service';
import Swal from 'sweetalert2';

export interface Country {
  id_t2_1_country:string;
  t2_1_country_name: string;
  t2_1_div1_called: string;
  t2_1_div2_called: string;
  t2_1_div3_called: string;
}

@Component({
  selector: 'app-country',
  templateUrl: './country.component.html',
  styleUrl: './country.component.css'
})
export class CountryComponent {

  title(title: any) {
    throw new Error('Method not implemented.');
  }

  items: { index: number, value: string }[] = [];
  selectedLocation:any;
  division: string[] = []; 
  locations: Country[] = [];
  @Input() countries: any[] = [];

  constructor(private fb: FormBuilder,private countryService:CountryService,
   private sweetalert:SweetalertService, private componentFactoryResolver: ComponentFactoryResolver) {
  }
  itemsPerPage = 2;
  currentPage = 1;
  paginatedOrders = this.locations.slice(0, this.itemsPerPage);

  get totalPages(): number {
    return Math.ceil(this.locations.length / this.itemsPerPage);
  }
  ngOnInit(): void {
    this.getLocations();
    
  }
  @ViewChild('popupContainer', { read: ViewContainerRef })
popupContainer!: ViewContainerRef;

//------Design----------------------------------------
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
  this.paginatedOrders = this.locations.slice(start, end);
}

searchTerm = '';
filterDate = '';
filterStatus = '';
filteredLocations = [...this.locations];
applyFilters() {
  let location = [...this.locations];

  // Filter by search term
  // if (this.searchTerm) {
  //   const search = this.searchTerm.toLowerCase();
  //   location = location.filter(
  //     (location) =>
  //       location.country.toLowerCase().includes(search) ||
  //     location.division1.toLowerCase().includes(search)
  //   );
  // }

  // Filter by date
  // if (this.filterDate) {
  //   location = location.filter(
  //     (location) => new Date(location.orderDate).toDateString() === new Date(this.filterDate).toDateString()
  //   );
  // }

  // Filter by status
  // if (this.filterStatus) {
  //   orders = orders.filter(
  //     (order) => order.deliveryStatus === this.filterStatus
  //   );
  // }

  // this.filteredOrders = orders;
  this.updatePaginatedOrders();
}

// ------------------Get---------------------------
getLocations(): void {
  this.countryService.getLocations().subscribe({
    next: (res) => {
      this.locations = res.data.Items;
      console.log('Locations loaded:', this.locations);
    },
    error: (error) => {
      console.error('Failed to load locations:', error);
    },
  });
}

// ------------GetById------------------------------
getCountryById(id_t2_1_country:number){
  this.countryService.getCountryById(id_t2_1_country).subscribe({
    next:(response)=>{
      this.countries=response;
    }
  })
}
  ///------------------create----------------------


  openAddCountry(){
    this.popupContainer.clear();
    const factory = this.componentFactoryResolver.resolveComponentFactory(CreateCountryComponent);
    const componentRef = this.popupContainer.createComponent(factory);
    componentRef.instance.closePopup = () => {
      this.popupContainer.clear();
      this.getLocations(); 
    };
  }

// ---------------------Edit-Icon-----------------
editLocation(location: any): void {
  this.popupContainer.clear();
  this.countryService.getCountryById(location.id_t2_1_country).subscribe({
    next: (response) => {
      console.log(response);
      
      const factory = this.componentFactoryResolver.resolveComponentFactory(EditCountryComponent);
      const componentRef = this.popupContainer.createComponent(factory);
      componentRef.instance.locationData = response.data;
      componentRef.instance.closePopup = () => {
        this.popupContainer.clear();
        this.getLocations(); 
      };

      console.log('Editing location with fetched data:', response.data);
    },
    error: (error) => {
      console.error('Failed to fetch location details:', error);
    },
  });
}

// ---------------Delete--------------------------------
deleteLocation(id: any): void {

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
      this.countryService.deleteLocation(id).subscribe({
        next: (res) => {
          if(res.message=="Success"){
            this.sweetalert.showToast('success','Succefully deleted');
            this.locations = this.locations.filter(item => item.id_t2_1_country !== id);
          }
        },
        error: (error) => {
          this.sweetalert.showToast('error','Oops! Something went wrong.');
        },
      });
     
    }
  });
}

// ---------------divOne-----------------------
divOnePopup(location: any): void {


  this.popupContainer.clear();
   
  this.countryService.getDivisionOneByCountryId(location).subscribe({
  next: (response) => {
    console.log(response);
    
    const factory = this.componentFactoryResolver.resolveComponentFactory(Division1Component);
    const componentRef = this.popupContainer.createComponent(factory);
    componentRef.instance.locationData = response.data;
    componentRef.instance.closePopup = () => {
      this.popupContainer.clear();
    };
  
    // Log to verify data flow
    console.log('Popup created with location data:', location);
    // this.states;
  },
  error: (error) => {
    console.error('Failed to fetch location details:', error);
  },
});

}

// -----------------DivTwo-------------------------------
divTWoPopup(location:any):void {

    this.popupContainer.clear();
    
    this.countryService.getDivisionOneByCountryId(location).subscribe({
    next: (response) => {
      console.log(response);
      
      const factory = this.componentFactoryResolver.resolveComponentFactory(Division2Component);
      const componentRef = this.popupContainer.createComponent(factory);
      componentRef.instance.locationData = response.data;
      componentRef.instance.closePopup = () => {
        this.popupContainer.clear();
      };
    
      // Log to verify data flow
      console.log('Popup created with location data:', location);
      // this.states;
    },
    error: (error) => {
      console.error('Failed to fetch location details:', error);
    },
  });
}

// -------------Div Three--------------------------------------
divthreePopup(location:any){
  
  this.popupContainer.clear();
    
  this.countryService.getDivisionOneByCountryId(location).subscribe({
  next: (response) => {
    console.log(response);
    
    const factory = this.componentFactoryResolver.resolveComponentFactory(Division3Component);
    const componentRef = this.popupContainer.createComponent(factory);
    componentRef.instance.locationData = response.data;
    componentRef.instance.closePopup = () => {
      this.popupContainer.clear();
    };
  
    // Log to verify data flow
    console.log('Popup created with location data:', location);
    // this.states;
  },
  error: (error) => {
    console.error('Failed to fetch location details:', error);
  },
});
}


}
