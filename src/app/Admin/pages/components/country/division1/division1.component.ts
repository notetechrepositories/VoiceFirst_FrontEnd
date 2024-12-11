import { Component, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CountryService } from '../../../../../Services/countryService/country.service';
import { SweetalertService } from '../../../../../Services/sweetAlertService/sweetalert.service';
import Swal from 'sweetalert2';
import { AnyCatcher } from 'rxjs/internal/AnyCatcher';
import * as XLSX from 'xlsx';
export interface Division {
  id_t2_1_country:string;
  id_t2_1_div1: string;  
  t2_1_div1_name: string;
}
@Component({
  selector: 'app-division1',
  templateUrl: './division1.component.html',
  styleUrl: './division1.component.css'
})

export class Division1Component {

  @Output() closePopup = () => {};
  @Input() locationData: any;

  divisionOneForm: FormGroup;
  divisionOne:Division[]=[];
  newDivisionOne:any[]=[];
  division:any[]=[];
  
  constructor(private router:Router,private fb: FormBuilder,private countryService :CountryService,
    private sweetalert:SweetalertService
  )
  {
    this.divisionOneForm = this.fb.group({
      id_t2_1_country: [''],
      t2_1_div1_name: ['',Validators.required] 
      
    });
  }

  ngOnInit(): void {
  this.getData();
 
  }

  onClose() {
    this.closePopup();
    this.router.navigate(['/components/country'])
  }
  getData(){
    console.log(this.locationData);
    
    if (this.locationData) {
      this.divisionOne = this.locationData.Items.map((item: Division) => {
        return {
          id_t2_1_div1: item.id_t2_1_div1,  
          t2_1_div1_name: item.t2_1_div1_name,
          id_t2_1_country:item.id_t2_1_country
        };
      });
    }
  }

  
  addDivisionOne(): void {

    let countryId = this.locationData.Items[0].id_t2_1_country;
    const data=this.divisionOneForm.value;
    
    const values:any={
      t2_1_div1_name:data.t2_1_div1_name,
      id_t2_1_country:countryId,
      
    }
    console.log(values);
    this.countryService.insertDivisionOne(values).subscribe({
      next: (response) => {
        console.log(response);
        
        if(response.message=="Success"){
          this.sweetalert.showToast('success','Successfully created.');
          console.log(response.data.Items.id);
          this.divisionOne.push(data);
          this.getDivisionById(response.data.Items.countryId);
          console.log('Location added successfully:', response);
         
          console.log(this.divisionOne);
          this.divisionOneForm.reset();
        }
    


      },
      error: (error) => {
        console.error('Error adding location:', error);
        alert('Failed to add location.');
      },
    });

    }

    getDivisionById(divisionOneId:any){
      this.countryService.getDivisionOneByCountryId(divisionOneId).subscribe({
        next: (res) => {
          console.log('Division One:', res);

          this.divisionOne = res.data.Items;
        },
        error: (error) => {
          console.error('Failed to load Division Two:', error);
        },
      });
  }

    onSubmit(): void {
      
      this.countryService.insertDivisionOne(this.newDivisionOne).subscribe({
        next: (response) => {
          console.log('Location added successfully:', response);
          this.closePopup();
          this.divisionOneForm.reset();
        },
        error: (error) => {
          console.error('Error adding location:', error);
          alert('Failed to add location.');
        },
      });
    }

    editDivisionOne(divisionOne:any): void { 
    console.log(divisionOne);
    
      (async () => {
        const inputValue = divisionOne.t2_1_div1_name;
        const { value: name } = await Swal.fire({


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
        if (name) {
          const data:any={
            id_t2_1_country:divisionOne.id_t2_1_country,
            id_t2_1_div1:divisionOne.id_t2_1_div1,
            t2_1_div1_name:name
          }
          this.countryService.updateDivisionOne(data).subscribe({
                  next: (response) => {
                    if(response.message=="Success"){
                      this.sweetalert.showToast('success','Successfully created.');
                      const index = this.divisionOne.findIndex(item => item.id_t2_1_div1 === data.id_t2_1_div1);
                        if (index !== -1) {
                          this.divisionOne[index] = { ...this.divisionOne[index], ...data };
                        }
                    }
                    else{
                      this.sweetalert.showToast('error',response.message);
                    }
                  },
                  error: (error) => {
                    this.sweetalert.showToast('error','Oops! Something went wrong');
                  },
                });
          
        }
      })();
      
      // const data=this.divisionOneForm.value;
      // console.log(data);
      
      // this.countryService.updateDivisionOne(data).subscribe({
      //   next: (response) => {
      //     console.log('Location updated successfully:', response);
      //     this.closePopup();
      //     this.divisionOneForm.reset();
      //   },
      //   error: (error) => {
      //     console.error('Error adding location:', error);
      //     alert('Failed to add location.');
      //   },
      // });
    }
    // ---------------Delete--------------------------------
    removeDivisionOne(id: any): void {

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
          this.countryService.deleteDivisionOne(id).subscribe({
            next: (res) => {
              if(res.message=="Success"){
                this.sweetalert.showToast('success','Succefully deleted');
                this.divisionOne = this.divisionOne.filter(item => item.id_t2_1_div1 !== id);
              }
            },
            error: (error) => {
              this.sweetalert.showToast('error','Oops! Something went wrong.');
            },
          });
         
        }
      });
    }
    exportToExcel(): void {
      if (!this.locationData?.Items || this.locationData.Items.length === 0) {
        console.error('No data available to export');
        return;
      }
    
      const items = this.locationData.Items;
    
      const countryId = items[0]?.id_t2_1_country || 'Unknown Country ID';

        // Map items to the required data structure
        const data = items.map((item: any, index: number) => ({
          'Country Id': index === 0 ? countryId : '', // Set `Country Id` only for the first row
          'Division One': item.t2_1_div1_name,       // Populate `Division One` for all rows
        }));
    
      // Create a worksheet from the mapped data
      const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(data);
    
      // Create a new workbook and append the worksheet
      const wb: XLSX.WorkBook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, 'Locations');
    
      // Export the Excel file
      XLSX.writeFile(wb, 'Locations.xlsx');
    }
    

}
