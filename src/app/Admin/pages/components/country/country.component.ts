import { Component, ComponentFactoryResolver, ElementRef, Input, Pipe, ViewChild, ViewContainerRef } from '@angular/core';
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
import { HttpClient } from '@angular/common/http';

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
  selectedFile: File | null = null;
  //paginatedOrders:Country[]=[];
  
  constructor(private fb: FormBuilder,private countryService:CountryService,private http: HttpClient,
   private sweetalert:SweetalertService, private componentFactoryResolver: ComponentFactoryResolver) {
  }
  itemsPerPage = 3;
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
  console.log(this.locations);
  console.log(this.paginatedOrders);
  
  
}

searchTerm = '';
 filterDate = '';
filterCountry = '';
filteredLocations = [...this.locations];
applyFilters() {
  let locations = [...this.locations];
 //Filter by search term
  if (this.searchTerm) {
    const search = this.searchTerm.toLowerCase();
    locations = locations.filter(
      (location) =>
        location.t2_1_country_name.toLowerCase().includes(search) 
      // ||
      // location.division1.toLowerCase().includes(search)
    );   
  }

//  // Filter by Country

 if (this.filterCountry) {
  locations = locations.filter(
    (location) => location.t2_1_country_name === this.filterCountry
  );
}

//   // this.filteredOrders = orders;
  this.updatePaginatedOrders();
}

// ------------------Get---------------------------
getLocations(): void {
  this.countryService.getLocations().subscribe({
    next: (res) => {
      // Assuming `res.data.Items` contains the array of locations
      this.locations = res.data.Items || [];
      console.log('Locations loaded:', this.locations);
      this.updatePaginatedOrders(); // Update pagination after data is fetched
    },
    error: (error) => {
      console.error('Failed to load locations:', error);
      this.locations = []; // Clear locations on error
      this.updatePaginatedOrders(); // Ensure paginatedOrders is updated
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
            this.paginatedOrders = this.locations.filter(item => item.id_t2_1_country !== id);
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
exportToExcel(): void {
  // Map locations to the required data structure
  const data = this.locations.map((location: any) => ({
    countryName: location.t2_1_country_name,  
    divisionOne: location.t2_1_div1_called,  
    divisionTwo: location.t2_1_div2_called ,
    divisionThree: location.t2_1_div3_called 
  }));

  // Create a worksheet from the mapped data
  const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(data);

  // Set the custom header row with capitalized text
  const headers = ['Country Name', 'Division One', 'Division Two','Division Three'];


  // Set the header row in uppercase and bold
  ws['A1'].v = headers[0].toUpperCase();
  ws['B1'].v = headers[1].toUpperCase();
  ws['C1'].v = headers[2].toUpperCase();
  ws['D1'].v = headers[3].toUpperCase();



  // Create a new workbook and append the worksheet
  const wb: XLSX.WorkBook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, 'Locations');

  // Export the Excel file
  XLSX.writeFile(wb, 'locations.xlsx');
}
data: any[] = [];
@ViewChild('fileInput', { static: false }) fileInput!: ElementRef;
extractedData: any[] = []; 

// Trigger file input for importing
triggerFileInput(): void {
  this.fileInput.nativeElement.click();
}

// Handle file change event
onFileChange(event: any): void {
  const target: DataTransfer = <DataTransfer>(event.target);
  if (target.files.length !== 1) throw new Error('Cannot use multiple files');

  const reader: FileReader = new FileReader();
  reader.onload = (e: any) => {
    const bstr: string = e.target.result;
    const wb: XLSX.WorkBook = XLSX.read(bstr, { type: 'binary' });
    const wsname: string = wb.SheetNames[0];
    const ws: XLSX.WorkSheet = wb.Sheets[wsname];

    // Convert the sheet to JSON using column headers
    const data: any[] = XLSX.utils.sheet_to_json(ws);

    // Map the Excel data to the `Country` type
    const formattedData: Country[] = data.map((item) => ({
      id_t2_1_country: '', // Not available in Excel
      t2_1_country_name: item['COUNTRY NAME'] || '', // Map to "COUNTRY NAME" column
      t2_1_div1_called: item['DIVISION ONE'] || '', // Map to "DIVISION ONE" column
      t2_1_div2_called: item['DIVISION TWO'] || '', // Map to "DIVISION TWO" column
      t2_1_div3_called: item['DIVISION THREE'] || '', // Map to "DIVISION THREE" column
    }));

    // Append formatted data to locations and update the view
    this.locations = this.locations.concat(formattedData);
    console.log('Formatted Data:', formattedData);

    // Update pagination
    this.updatePaginatedOrders();
  };
  reader.readAsBinaryString(target.files[0]);
}


// Upload data to backend
// // Upload data to backend
// uploadData(): void {
//   if (!this.extractedData || this.extractedData.length === 0) {
//     console.error('No data available for upload');
//     return;
//   }
//   this.countryService.uploadFile(this.extractedData).subscribe({
//     next: (response) => {
//       console.log('Data successfully uploaded:', response);
//       alert('Data uploaded successfully');
//     },
//     error: (error) => {
//       console.error('Error uploading data:', error);        
//       alert('Error uploading data. Please try again.');
//     },
//   });

// }
    

}
