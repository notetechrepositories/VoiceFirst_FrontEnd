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
export interface CountryImport {
  t2_1_country_name: string;
  t2_1_div1_called: string;
  t2_1_div2_called: string;
  t2_1_div3_called: string;
}
export interface DivisionImport {
  t2_1_country_name:string;
  t2_1_div1_name: string;
}
export interface DivisiontwoImport {
  t2_1_country_name: string;
   t2_1_div1_name: string;
  t2_1_div2_name:string;
}
export interface DivisionthreeImport {
  t2_1_country_name: string;
  t2_1_div1_name: string;
  t2_1_div2_name:string;
  t2_1_div3_name:string;

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
  itemsPerPage = 10;
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
 // Filter by Country

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
  const body = { 
    filters: { 

    }
  };

  this.countryService.getLocations(body).subscribe({
    next: (res) => {
      this.locations = res.data.Items || [];
      this.updatePaginatedOrders(); 
    },
    error: (error) => {
      console.error('Failed to load locations:', error);
      this.locations = [];
      this.updatePaginatedOrders(); 
    },
  });
}

// ------------GetById------------------------------

getCountryById(id_t2_1_country:number){
  const body = { 
    filters: { 
      id_t2_1_country: id_t2_1_country
    }
  };
  this.countryService.getLocations(body).subscribe({
    next:(response)=>{
      console.log(response);
      
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
  console.log(location);
  
  this.popupContainer.clear();
      const factory = this.componentFactoryResolver.resolveComponentFactory(EditCountryComponent);
      const componentRef = this.popupContainer.createComponent(factory);
      componentRef.instance.locationData = location;
      componentRef.instance.closePopup = () => {
        this.popupContainer.clear();
        this.getLocations(); 
      };

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
            //this.paginatedOrders = this.locations.filter(item => item.id_t2_1_country !== id);
            this.getLocations();
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

  const factory = this.componentFactoryResolver.resolveComponentFactory(Division1Component);
  const componentRef = this.popupContainer.createComponent(factory);
  componentRef.instance.countryId = location.id_t2_1_country;
  componentRef.instance.countryName = location.t2_1_country_name;
  componentRef.instance.closePopup = () => {
    this.popupContainer.clear();
  };

}

// -----------------DivTwo-------------------------------
divTWoPopup(location:any):void {

    this.popupContainer.clear();

    const factory = this.componentFactoryResolver.resolveComponentFactory(Division2Component);
    const componentRef = this.popupContainer.createComponent(factory);
    componentRef.instance.countryId = location;
    componentRef.instance.closePopup = () => {
      this.popupContainer.clear();
    };
}

// -------------Div Three--------------------------------------
divthreePopup(location:any){
  
  this.popupContainer.clear();

  const factory = this.componentFactoryResolver.resolveComponentFactory(Division3Component);
  const componentRef = this.popupContainer.createComponent(factory);
  componentRef.instance.countryId = location;
  componentRef.instance.closePopup = () => {
    this.popupContainer.clear();
  };
    
  
}

// ------------Export---------------------------------------------------

exportToExcel(): void {
 
  const data = this.locations.map((location: any) => ({
    countryName: location.t2_1_country_name,  
    divisionOne: location.t2_1_div1_called,  
    divisionTwo: location.t2_1_div2_called ,
    divisionThree: location.t2_1_div3_called 
  }));
  const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(data);
  const headers = ['Country Name', 'Division One', 'Division Two','Division Three'];
  ws['A1'].v = headers[0].toUpperCase();
  ws['B1'].v = headers[1].toUpperCase();
  ws['C1'].v = headers[2].toUpperCase();
  ws['D1'].v = headers[3].toUpperCase();
  const wb: XLSX.WorkBook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, 'Locations');
  XLSX.writeFile(wb, 'locations.xlsx');
}


// -----------------------Import country--------------------------------
@ViewChild('fileInput', { static: false }) fileInput!: ElementRef;

triggerFileInput(): void {
  this.fileInput.nativeElement.click();
}
onFileChange(event: any): void {
  const target: DataTransfer = <DataTransfer>(event.target);
  if (target.files.length !== 1) throw new Error('Cannot use multiple files');
  const reader: FileReader = new FileReader();
  reader.onload = (e: any) => {
    const bstr: string = e.target.result;
    const wb: XLSX.WorkBook = XLSX.read(bstr, { type: 'binary' });
    const wsname: string = wb.SheetNames[0];
    const ws: XLSX.WorkSheet = wb.Sheets[wsname];
    const data: any[] = XLSX.utils.sheet_to_json(ws);
    const formattedData: CountryImport[] = data.map((item) => ({
      t2_1_country_name: item['COUNTRY NAME'] || '', 
      t2_1_div1_called: item['DIVISION ONE'] || '', 
      t2_1_div2_called: item['DIVISION TWO'] || '', 
      t2_1_div3_called: item['DIVISION THREE'] || '', 
    }));
    this.countryService.uploadFile(formattedData).subscribe({
      next: (response) => {
       if(response.status==200){
        this.sweetalert.showToast('success','Data imported succesfully');
        this.getLocations();
       }
       if(response.status==400){
        this.sweetalert.showToast('error','Failed to import data');
       }
      },
      error: (error) => {
        this.sweetalert.showToast('error','Something went wrong')
      },
    });
    this.updatePaginatedOrders();
  };
  reader.readAsBinaryString(target.files[0]);
}
// ---------------Import Division One----------------------------------------

@ViewChild('fileInput1', { static: false }) fileInput1!: ElementRef;
triggerFile(): void {
  this.fileInput1.nativeElement.click();
}

onFileChangeDivisionOne(event: any): void {
  const target = event.target as HTMLInputElement;

  if (!target.files || target.files.length !== 1) {
    throw new Error('Cannot use multiple files');
  }

  const file: File = target.files[0];
  const reader: FileReader = new FileReader();

  reader.onload = (e: any) => {
    const binaryString: string = e.target.result;
    const workbook: XLSX.WorkBook = XLSX.read(binaryString, { type: 'binary' });
    const sheetName: string = workbook.SheetNames[0];
    const worksheet: XLSX.WorkSheet = workbook.Sheets[sheetName];
    
    // Parse data
    const data: any[] = XLSX.utils.sheet_to_json(worksheet);
    const formattedData: DivisionImport[] = data.map((item) => ({
      t2_1_country_name: item['Country Name'] || '',
      t2_1_div1_name: item['Division One'] || ''
    }));

    this.countryService.uploadFileDivisionOne(formattedData).subscribe({
      next: (response) => {
        if (response.status === 200) {
          this.sweetalert.showToast('success', 'Data imported successfully');
        } else if (response.status === 400) {
          this.sweetalert.showToast('error', 'Failed to import data');
        }
      },
      error: (error) => {
        console.error(error);
        this.sweetalert.showToast('error', 'Something went wrong');
      },
    });
  };

  // Read the file as binary
  reader.readAsBinaryString(file);
}
// --------------Import Division Two--------------------------
@ViewChild('fileInput2', { static: false }) fileInput2!: ElementRef;

triggerFileDivisionTwo(): void {
  this.fileInput2.nativeElement.click();
}

onFileChangeDivisionTwo(event: any): void {
  const target = event.target as HTMLInputElement;

  if (!target.files || target.files.length !== 1) {
    throw new Error('Cannot use multiple files');
  }

  const file: File = target.files[0];
  const reader: FileReader = new FileReader();

  reader.onload = (e: any) => {
    const binaryString: string = e.target.result;
    const workbook: XLSX.WorkBook = XLSX.read(binaryString, { type: 'binary' });
    const sheetName: string = workbook.SheetNames[0];
    const worksheet: XLSX.WorkSheet = workbook.Sheets[sheetName];
    
    // Parse data
    const data: any[] = XLSX.utils.sheet_to_json(worksheet);
    const formattedData: DivisiontwoImport[] = data.map((item) => ({
      t2_1_country_name:item['Country Name'] ||'',
      t2_1_div1_name: item['Division One'] || '',
      t2_1_div2_name: item['Division Two'] || ''
    }));
    this.countryService.uploadFileDivisionTwo(formattedData).subscribe({
      next: (response) => {
        if (response.status === 200) {
          this.sweetalert.showToast('success', 'Data imported successfully');
        } else if (response.status === 400) {
          this.sweetalert.showToast('error', 'Failed to import data');
        }
      },
      error: (error) => {
        console.error(error);
        this.sweetalert.showToast('error', 'Something went wrong');
      },
    });
  };

  // Read the file as binary
  reader.readAsBinaryString(file);
}
// --------------Import Division Three--------------------------
@ViewChild('fileInput3', { static: false }) fileInput3!: ElementRef;

triggerFileDivisionThree(): void {
  this.fileInput3.nativeElement.click();
}

onFileChangeDivisionThree(event: any): void {
  const target = event.target as HTMLInputElement;

  if (!target.files || target.files.length !== 1) {
    throw new Error('Cannot use multiple files');
  }

  const file: File = target.files[0];
  const reader: FileReader = new FileReader();

  reader.onload = (e: any) => {
    const binaryString: string = e.target.result;
    const workbook: XLSX.WorkBook = XLSX.read(binaryString, { type: 'binary' });
    const sheetName: string = workbook.SheetNames[0];
    const worksheet: XLSX.WorkSheet = workbook.Sheets[sheetName];
    
    // Parse data
    const data: any[] = XLSX.utils.sheet_to_json(worksheet);
    const formattedData: DivisionthreeImport[] = data.map((item) => ({
      t2_1_country_name:item['Country Name'] ||'',
      t2_1_div1_name: item['Division One'] || '',
      t2_1_div2_name: item['Division Two'] || '',
      t2_1_div3_name:item['Division Three'] ||''
    }));
    this.countryService.uploadFileDivisionThree(formattedData).subscribe({
      next: (response) => {
        if (response.status === 200) {
          this.sweetalert.showToast('success', 'Data imported successfully');
        } else if (response.status === 400) {
          this.sweetalert.showToast('error', 'Failed to import data');
        }
      },
      error: (error) => {
        console.error(error);
        this.sweetalert.showToast('error', 'Something went wrong');
      },
    });
  };

  // Read the file as binary
  reader.readAsBinaryString(file);
}
}




