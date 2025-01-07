import { Component, ElementRef, Input, Output, ViewChild } from '@angular/core';
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
  t2_1_country_name:string;
}
export interface DivisionImport {
  t2_1_country_name:string;
  t2_1_div1_name: string;
}

@Component({
  selector: 'app-division1',
  templateUrl: './division1.component.html',
  styleUrl: './division1.component.css'
})

export class Division1Component {

  @Output() closePopup = () => {};
  @Input() countryId !:string;
  @Input() countryName !:string;
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
   this.getDivisionOneByCountryId(this.countryId);
  }

  onClose() {
    this.closePopup();
    this.router.navigate(['/components/country'])
  }

  // -----------------Get Division One-------------------------------------
  getDivisionOneByCountryId(countryId:string){ 
    const body = { 
      filters: { 
        id_t2_1_country: countryId
      }
    };
    this.countryService.getDivisionOneByCountryId(body).subscribe({
      next: (response) => {    
        this.divisionOne=response.data.Items.map((item: Division) => {
          return {
            id_t2_1_div1: item.id_t2_1_div1,  
            t2_1_div1_name: item.t2_1_div1_name,
            id_t2_1_country:item.id_t2_1_country,
            t2_1_country_name:item.t2_1_country_name
          };
        });
       },});
  }

  // --------------------------Insert+----------------------------------
  addDivisionOne(): void {
    const data=this.divisionOneForm.value;
    
    const values:any={
      id_t2_1_country:this.countryId,
      t2_1_div1_name:data.t2_1_div1_name
      
    }
    this.countryService.insertDivisionOne(values).subscribe({
      next: (response) => {

        if(response.message=="Success"){
          this.sweetalert.showToast('success','Successfully created.');
          this.divisionOne.push(data);
          this.getDivisionOneByCountryId(this.countryId);
          this.divisionOneForm.reset();
        }
        else{
          this.sweetalert.showToast('error',response.message);
        }
      },
      error: (error) => {
        console.error('Error adding location:', error);
        alert('Failed to add location.');
      },
    });

    }

// ------------------------Get------------------------------------------------------------------
  //   getDivisionById(divisionOneId:any){
  //     this.countryService.getDivisionOneByCountryId(divisionOneId).subscribe({
  //       next: (res) => {
  //         this.divisionOne = res.data.Items;
  //       },
  //       error: (error) => {
  //         console.error('Failed to load Division Two:', error);
  //       },
  //     });
  // }
// -------------------------------------------------------------------------
    onSubmit(): void {
      
      this.countryService.insertDivisionOne(this.newDivisionOne).subscribe({
        next: (response) => {
          this.closePopup();
          this.divisionOneForm.reset();
        },
        error: (error) => {
          console.error('Error adding location:', error);
          alert('Failed to add location.');
        },
      });
    }
// -----------------------------Edit----------------------------------------
    editDivisionOne(divisionOne:any): void { 
    
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
      // -----------------------------------------------------------------------------------------------
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
     
    // ------------------------Export---------------------------------------------

    exportToExcel(): void {
      console.log(this.divisionOne);
      
      if (!this.divisionOne || this.divisionOne.length === 0) {
        console.error('No data available to export');
        return;
      }
      const items = this.divisionOne;
      
        const data = items.map((item: any, index: number) => ({
          'Country Name': index === 0 ? this.countryName : '', 
          'Division One': item.t2_1_div1_name,       
        }));

      const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(data);
      const wb: XLSX.WorkBook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, 'Locations');
      XLSX.writeFile(wb, 'Locations.xlsx');
    }
    // --------------------Import---------------------------------------------
    @ViewChild('fileInput', { static: false }) fileInput!: ElementRef;

    triggerFileInput(): void {
      this.fileInput.nativeElement.click();
    }
    onFileChange(event: any): void {
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
        console.log(data);
        
        const formattedData: DivisionImport[] = data.map((item) => ({
          t2_1_country_name: item['Country Name'] || '',
          t2_1_div1_name: item['Division One'] || ''
        }));
    
        console.log(formattedData);
    
        // Call API to upload data
        this.countryService.uploadFileDivisionOne(formattedData).subscribe({
          next: (response) => {
            console.log(response);
            if (response.status === 200) {
              this.sweetalert.showToast('success', 'Data imported successfully');
              this.getDivisionOneByCountryId(this.countryId)
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
