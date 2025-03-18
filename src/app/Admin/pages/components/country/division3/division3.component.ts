import { Component, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { CountryService } from '../../../../../Services/countryService/country.service';
import { SweetalertService } from '../../../../../Services/sweetAlertService/sweetalert.service';
import Swal from 'sweetalert2';
import { HttpEvent, HttpSentEvent, HttpResponse, HttpErrorResponse } from '@angular/common/http';
export interface Division {
  id_t2_1_div2: string;
  t2_1_div2_name:string;
  id_t2_1_div1:string;
  t2_1_div1_name:string;
  t2_1_div3_name:string;
  id_t2_1_div3:string;
}
@Component({
  selector: 'app-division3',
  templateUrl: './division3.component.html',
  styleUrl: './division3.component.css'
})
export class Division3Component {
  
  @Output() closePopup = () => {};
  @Input() locationData: any;
  @Input() countryId!:string;
  divisionThreeForm:FormGroup;
  divisionThree:any[]=[];
  divisionTwo:Division[]=[];
  divisionOne:Division[]=[];
  constructor(private router:Router,private fb: FormBuilder,private countryService :CountryService,
    private sweetalert:SweetalertService
  )
  {
    this.divisionThreeForm = this.fb.group({
      t2_1_div2_name: [''],
      id_t2_1_div2: [''],
      t2_1_div1_name: [''],
      id_t2_1_div1: [''],
      t2_1_div3_name:['']
      
      
    });
  }
  ngOnInit():void{
    this.getDivisionTwoData();
    this.getDivisionOneByCountryId(this.countryId);
   }
 
  addDivisionThree(){
    const data=this.divisionThreeForm.value;
        this.countryService.insertDivisionThree(data).subscribe({
      next: (response) => {
        if(response.message=="Success"){
          this.sweetalert.showToast('success','Successfully created.');
          this.divisionTwo.push(data);
          this.getDivisionThreeByDivisionTwoId(data.id_t2_1_div2);
          this.divisionThreeForm.patchValue({
            t2_1_div3_name:''
          });
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
  // -----------------Get Division One-------------------------------------
    getDivisionOneByCountryId(countryId:any){ 
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
              t2_1_div1_name: item.t2_1_div1_name
            };
          });
         },});
    }
 

  editDivisionThree(divisionthree:any){
    (async () => {
      const inputValue = divisionthree.t2_1_div3_name;
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
          id_t2_1_div2:divisionthree.id_t2_1_div2,
          id_t2_1_div3:divisionthree.id_t2_1_div3,
          t2_1_div3_name:name
        }
        
        this.countryService.updateDivisionThree(data).subscribe({
                next: (response) => {
                  if(response.message=="Success"){
                    this.sweetalert.showToast('success','Successfully created.');
                    const index = this.divisionThree.findIndex(item => item.id_t2_1_div3 === data.id_t2_1_div3);
                      if (index !== -1) {
                        this.divisionThree[index] = { ...this.divisionThree[index], ...data };
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

  }


  removeDivisionThree(id:any){
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
        this.countryService.deleteDivisionThree(id).subscribe({
          next: (res) => {
            if(res.message=="Success"){
              this.sweetalert.showToast('success','Succefully deleted');
              this.divisionThree = this.divisionThree.filter(item => item.id_t2_1_div3 !== id);
            }
          },
          error: (error) => {
            this.sweetalert.showToast('error','Oops! Something went wrong.');
          },
        });
       
      }
    });
  }
  onClose(){
    this.closePopup();
    this.router.navigate(['/country'])
  }
  onChangeDivisionthree(event:Event): void {
      const selectElement = event.target as HTMLSelectElement; 
      const divisiontwoId = selectElement.value; 
      this.getDivisionThreeByDivisionTwoId(divisiontwoId);
    }
    getDivisionTwoData():void{
      if (this.locationData) {
        this.divisionTwo = this.locationData.Items.map((item: Division) => {
          return {
            id_t2_1_div2: item.id_t2_1_div2,  
            t2_1_div2_name: item.t2_1_div2_name
          };
        });
      }
    }
    onChangeDivisiontwo(event: Event): void {
      const selectElement = event.target as HTMLSelectElement; 
      const divisionOneId = selectElement.value; 
      const body = { 
        filters: { 
          id_t2_1_div1: divisionOneId
        }
      };
      this.countryService.getDivisionTwoByDivisionOneId(body).subscribe({
        next: (res) => {
          console.log('Response from Division Two API:', res);
          this.divisionTwo = res.data.Items;  
          console.log('Division Two:', this.divisionTwo);
        },
        error: (error) => {
          console.error('Failed to load Division Two:', error);
        },
      });
    }

    getDivisionThreeByDivisionTwoId(divisiontwoId:string){
      console.log(divisiontwoId);
      
      const body = { 
        filters: { 
          id_t2_1_div2: divisiontwoId
        }
      };
      this.countryService.getDivisionThree(body).subscribe({
        next: (res) => {
          this.divisionThree = res.data.Items; 
        },
        error: (error) => {
          console.error('Failed to load Division Two:', error);
          this.sweetalert.showToast('error',"Something went wrong")
        },
      });
    }

    onSubmit(){

    }
}
