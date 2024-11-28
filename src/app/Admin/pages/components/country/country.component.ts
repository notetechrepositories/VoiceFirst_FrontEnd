import { Component, ComponentFactoryResolver, Input, ViewChild, ViewContainerRef } from '@angular/core';
import * as XLSX from 'xlsx';
import { ReactiveFormsModule, FormBuilder,FormControl, FormGroup, Validators } from '@angular/forms';
import { CreateCountryComponent } from './create-country/create-country.component';
import { EditCountryComponent } from './edit-country/edit-country.component';
import { Division1Component } from './division1/division1.component';
import { CountryService } from '../../../../Services/countryService/country.service';

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
  showPopup: boolean = false;
  divtwoPopup:boolean=false;
  selectedLocation:any;
  locationForm: FormGroup;
  divisionForm: FormGroup;
  divisionTwoForm:FormGroup;
  division: string[] = []; 
  @Input() countries: any[] = [];
  // locations = [
  //   { country: 'USA', division1: 'County', division2: 'City-Towns' },
  //   { country: 'England', division1: 'County', division2: 'District' },
  //   { country: 'India', division1: 'State', division2: 'District', division3: 'City-Town-Village' },
  //   { country: 'Scotland', division1: 'County', division2: 'City - Town - Village'}
    
  // ];
   locations: Country[] = [];
  states: string[] = [
    'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh', 'Goa', 
    'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka', 'Kerala', 
    'Madhya Pradesh', 'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram', 'Nagaland', 
    'Odisha', 'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu', 'Telangana', 'Tripura', 
    'Uttar Pradesh', 'Uttarakhand', 'West Bengal', 'Andaman and Nicobar Islands', 
    'Chandigarh', 'Dadra and Nagar Haveli and Daman and Diu', 'Lakshadweep', 'Delhi', 
    'Puducherry'
  ];
  statesWithDistricts: { [state: string]: string[] } = {
    'Andhra Pradesh': [
      'Anantapur', 'Chittoor', 'East Godavari', 'Guntur', 'Kadapa', 'Krishna', 'Kurnool',
      'Nellore', 'Prakasam', 'Srikakulam', 'Visakhapatnam', 'Vizianagaram', 'West Godavari',
      'YSR Kadapa'
    ],
    'Arunachal Pradesh': [
      'Anjaw', 'Changlang', 'East Kameng', 'East Siang', 'Kamle', 'Kra Daadi', 'Kurung Kumey',
      'Lohit', 'Longding', 'Lower Dibang Valley', 'Lower Subansiri', 'Namsai', 'Papum Pare',
      'Tawang', 'Tirap', 'Upper Dibang Valley', 'Upper Siang', 'Upper Subansiri', 'West Kameng', 'West Siang'
    ],
    'Assam': [
      'Barpeta', 'Bongaigaon', 'Cachar', 'Darrang', 'Dhemaji', 'Dibrugarh', 'Goalpara', 'Golaghat',
      'Hailakandi', 'Jorhat', 'Kamrup', 'Kamrup Metropolitan', 'Karbi Anglong', 'Karimganj', 'Kokrajhar',
      'Lakhimpur', 'Majuli', 'Morigaon', 'Nagaon', 'Nalbari', 'Sivasagar', 'Sonitpur', 'Tinsukia', 'Udalguri', 'West Karbi Anglong'
    ],
    'Bihar': [
      'Araria', 'Arwal', 'Aurangabad', 'Banka', 'Begusarai', 'Bhagalpur', 'Buxar', 'Darbhanga', 'East Champaran',
      'Gaya', 'Gopalganj', 'Jamui', 'Jehanabad', 'Kaimur', 'Katihar', 'Khagaria', 'Kishanganj', 'Lakhisarai',
      'Madhubani', 'Munger', 'Muzaffarpur', 'Nalanda', 'Nawada', 'Patna', 'Purnia', 'Rohtas', 'Saharsa', 'Samastipur',
      'Saran', 'Sheikhpura', 'Sheohar', 'Sitamarhi', 'Supaul', 'Vaishali', 'West Champaran'
    ],
    'Chhattisgarh': [
      'Balod', 'Baloda Bazar', 'Balrampur', 'Bastar', 'Bemetara', 'Bilaspur', 'Dantewada', 'Dhamtari',
      'Durg', 'Gariaband', 'Janjgir-Champa', 'Jashpur', 'Kabirdham', 'Kanker', 'Korba', 'Kondagaon', 'Mahasamund',
      'Mungeli', 'Narayanpur', 'Raigarh', 'Raipur', 'Rajnandgaon', 'Sukma', 'Surajpur', 'Surguja'
    ],
    'Goa': [
      'North Goa', 'South Goa'
    ],
    'Gujarat': [
      'Ahmedabad', 'Amreli', 'Anand', 'Aravalli', 'Banas Kantha', 'Baroda', 'Bhavnagar', 'Bhiloda', 'Chhota Udepur',
      'Dahod', 'Dangs', 'Gandhinagar', 'Jamnagar', 'Junagadh', 'Kutch', 'Mahisagar', 'Mehsana', 'Narmada', 'Navsari',
      'Panchmahal', 'Patan', 'Porbandar', 'Rajkot', 'Sabarkantha', 'Surat', 'Surendranagar', 'Vadodara', 'Valsad'
    ],
    'Haryana': [
      'Ambala', 'Bhiwani', 'Charkhi Dadri', 'Faridabad', 'Fatehabad', 'Gurugram', 'Hisar', 'Jhajjar', 'Jind',
      'Kaithal', 'Karnal', 'Kurukshetra', 'Mahendragarh', 'Narnaul', 'Panchkula', 'Panipat', 'Rewari', 'Sirsa',
      'Sonipat', 'Yamunanagar'
    ],
    'Himachal Pradesh': [
      'Bilaspur', 'Chamba', 'Hamirpur', 'Kangra', 'Kullu', 'Mandi', 'Shimla', 'Sirmaur', 'Solan', 'Una'
    ],
    'Jharkhand': [
      'Bokaro', 'Chatra', 'Deoghar', 'Dhanbad', 'Dumka', 'East Singhbhum', 'Garhwa', 'Giridih', 'Godda',
      'Hazaribagh', 'Jamtara', 'Khunti', 'Koderma', 'Latehar', 'Lohardaga', 'Pakur', 'Palamu', 'Ramgarh',
      'Ranchi', 'Sahibganj', 'Seraikela-Kharsawan', 'Simdega', 'West Singhbhum'
    ],
    'Karnataka': [
      'Bagalkot', 'Bangalore Rural', 'Bangalore Urban', 'Belagavi', 'Bellary', 'Bidar', 'Chamarajanagar', 'Chikballapur',
      'Chikkamagaluru', 'Chitradurga', 'Dakshina Kannada', 'Davangere', 'Dharwad', 'Gadag', 'Hassan', 'Haveri', 'Kodagu',
      'Kolar', 'Koppal', 'Mandya', 'Mysuru', 'Raichur', 'Ramanagara', 'Shivamogga', 'Tumakuru', 'Udupi', 'Uttara Kannada',
      'Vijayapura', 'Yadgir'
    ],
    'Kerala': [
      'Alappuzha', 'Ernakulam', 'Idukki', 'Kottayam', 'Kozhikode', 'Malappuram', 'Palakkad', 'Pathanamthitta',
      'Thiruvananthapuram', 'Thrissur', 'Wayanad'
    ],
    'Madhya Pradesh': [
      'Ashok Nagar', 'Balaghat', 'Barwani', 'Betul', 'Bhopal', 'Burhanpur', 'Chhatarpur', 'Chhindwara', 'Dewas',
      'Dhar', 'Dindori', 'Guna', 'Gwalior', 'Harda', 'Hoshangabad', 'Indore', 'Jabalpur', 'Jhabua', 'Katni', 'Khandwa',
      'Khargone', 'Mandla', 'Mandsaur', 'Morena', 'Narsinghpur', 'Neemuch', 'Panna', 'Rajgarh', 'Ratlam', 'Rewa', 'Sagar',
      'Satna', 'Sehore', 'Seoni', 'Shahdol', 'Shajapur', 'Sheopur', 'Shivpuri', 'Sidhi', 'Singrauli', 'Tikamgarh', 'Ujjain',
      'Vidisha'
    ],
    // Continue similarly for other states...
  };
  selectedDistricts: string[] = [];
  // countries: string[] = ['USA', 'Canada', 'UK','india'];

  showForm: boolean = false; // To toggle the popup visibility

  constructor(private fb: FormBuilder,private countryService:CountryService,private componentFactoryResolver: ComponentFactoryResolver) {
    this.locationForm = this.fb.group({
      country: ['', Validators.required],
      div1: [''],
      div2: [''],
      div3: [''],
    });
  
    this.locationForm = this.fb.group({
      country: [''],
    });
    this.divisionForm = this.fb.group({
      div1: [''],
      country: [[]],
    });
    this.divisionTwoForm=this.fb.group({
      div2:['']
    })
    
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
// ---------------------Edit-Icon-----------------
editLocation(location: any): void {
  this.popupContainer.clear();
console.log(location);

  // Fetch additional details using the country ID
  this.countryService.getCountryById(location).subscribe({
    next: (response) => {
      // Dynamically create the EditCountryComponent
      const factory = this.componentFactoryResolver.resolveComponentFactory(EditCountryComponent);
      const componentRef = this.popupContainer.createComponent(factory);

      // Pass the fetched data to the popup
      componentRef.instance.locationData = response.data;

      // Handle the closePopup event
    

      console.log('Editing location with fetched data:', response.data);
    },
    error: (error) => {
      console.error('Failed to fetch location details:', error);
    },
  });
}
// ---------------Delete--------------------------------
deleteLocation(location: any): void {
  
    this.countryService.deleteLocation(location).subscribe({
      next: () => {
        this.getLocations(); 
        console.log('Location deleted:', location);
      },
      error: (error) => {
        console.error('Failed to delete location:', error);
      },
    });
  
}
// ---------------divOne-----------------------
divOnePopup(location: any): void {
console.log(location);

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
    this.states;
  },
  error: (error) => {
    console.error('Failed to fetch location details:', error);
  },
});

}
///------------------create----------------------
@ViewChild('popupContainer', { read: ViewContainerRef })
popupContainer!: ViewContainerRef;

openAddCountry(){
    // Clear previous components if necessary
    this.popupContainer.clear();

    // Create a component factory for AddCompanyComponent
    const factory = this.componentFactoryResolver.resolveComponentFactory(CreateCountryComponent);
  
    // Create the component dynamically
    const componentRef = this.popupContainer.createComponent(factory);
  
    // Listen to events or data changes if necessary
    componentRef.instance.closePopup = () => {
      this.popupContainer.clear();
      this.getLocations(); 
    };
}

  // Div1
  onStateChange(event: Event) {
    // Cast the event target to HTMLSelectElement to access the 'value' property
    const selectElement = event.target as HTMLSelectElement;
    const state = selectElement.value;
  
    if (state && this.statesWithDistricts?.[state]) {
      this.selectedDistricts = this.statesWithDistricts[state];
    } else {
      this.selectedDistricts = []; // Reset if no districts available or state is not selected
    }
  }
  
  editDistrict(district: string) {
    // Handle edit logic
  }

  removeDistrict(district: string) {
    // Handle remove logic
  }
  closePopup2(){
    this.divtwoPopup = false;
  }
  divTWoPopup() {
    this.divtwoPopup = true;
    this.states;
    const popup = document.getElementById('popup');
   
    if (popup ) {
      popup.style.display = 'block';
     
    } else {
      console.error("Popup element not found.");
    }
  }
  onSubmitdiv2(): void {
    if (this.locationForm.valid) {
      const newLocation = this.divisionTwoForm.value;
      this.locations.push(newLocation); // Add new location to the list
      this.closeForm(); // Close the form modal
      this.locationForm.reset(); // Reset the form
    }
  }

  /////////////////create
  // Open the form popup
  openAddPopup(): void {
    this.showForm = true;
  }
 
  // Close the form popup
  closeForm(): void {
 
    this.showForm = false;
  }

///////////////////////////////////////////div1
  // Function to open the popup

  
  closePopup() {
    this.showPopup = false;
  }
  addItem(): void {
    const newState = this.divisionForm.get('div1')?.value.trim();
    if (newState && !this.states.includes(newState)) {
      this.states.push(newState);  // Add new state to the list
      this.divisionForm.get('div1')?.reset();  // Clear the input field
    }
  }
  removeItem(index: number) {
    this.items = this.items.filter(item => item.index !== index);
  }
  
  removeState(state: string): void {
    const index = this.states.indexOf(state);
    if (index !== -1) {
      this.states.splice(index, 1);  // Remove the state from the list
    }
  }

  editState(state: string): void {
    const newState = prompt('Edit state:', state);
    if (newState) {
      const index = this.states.indexOf(state);
      if (index !== -1) {
        this.states[index] = newState;  // Update the state name
      }
    }
  }

  // Handle form submission
  onSubmit(): void {
    if (this.locationForm.valid) {
      const newLocation = this.locationForm.value;
      this.locations.push(newLocation); // Add new location to the list
      this.closeForm(); // Close the form modal
      this.locationForm.reset(); // Reset the form
    }
  }

  
  
    
  
  openEditPopup(location: any) {
    throw new Error('Method not implemented.');
  }
  
    // Method to delete a location

     // Handle File Upload
  onFileChange(event: any) {
    const target: DataTransfer = <DataTransfer>(event.target);
    if (target.files.length !== 1) {
      console.error('Please upload a single file.');
      return;
    }

    const reader: FileReader = new FileReader();
    reader.onload = (e: any) => {
      const bstr: string = e.target.result;
      const wb: XLSX.WorkBook = XLSX.read(bstr, { type: 'binary' });

      // Assuming the first sheet contains the data
      const wsname: string = wb.SheetNames[0];
      const ws: XLSX.WorkSheet = wb.Sheets[wsname];

      // Convert the sheet to JSON
      const data = <any[]>XLSX.utils.sheet_to_json(ws, { header: 1 });
      this.processExcelData(data);
    };
    reader.readAsBinaryString(target.files[0]);
  }
  // Process the Excel Data
  processExcelData(data: any[]) {
    // Assuming the first row is headers
    const headers = data[0];
    const rows = data.slice(1);

    // this.locations = rows.map(row => {
    //   return {
    //     country: row[0] || '', // Replace with column index for "Country"
    //     division1: row[1] || '', // Replace with column index for "Division 1"
    //     division2: row[2] || '', // Replace with column index for "Division 2"
    //     division3: row[3] || '', // Replace with column index for "Division 3"
    //   };
    // });

    console.log('Imported Locations:', this.locations);
  }
}
