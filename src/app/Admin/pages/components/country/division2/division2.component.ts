import { Component, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { CountryService } from '../../../../../Services/countryService/country.service';
import Swal from 'sweetalert2';
import { SweetalertService } from '../../../../../Services/sweetAlertService/sweetalert.service';

export interface Division {
  id_t2_1_div1: string;  
  t2_1_div1_name: string;
  t2_1_div2_name:string;
  id_t2_1_div2:string;
}
@Component({
  selector: 'app-division2',
  templateUrl: './division2.component.html',
  styleUrl: './division2.component.css'
})
export class Division2Component {

  @Output() closePopup = () => {};
  @Input() countryId !:string;
  divisionTwoForm:FormGroup;
  divisionTwo:Division[]=[];
  divisionOne:Division[]=[];
  newDivisionTwo:any[]=[];

  constructor(private router:Router,private fb: FormBuilder,private countryService :CountryService,private sweetalert:SweetalertService)
  {
    this.divisionTwoForm = this.fb.group({
        id_t2_1_div1: [''],
        t2_1_div2_name:[''],
       
      
    });
  }

  ngOnInit():void{
  this.getDivisionOneByCountryId(this.countryId);
  }
  onSubmit(){
 
  }

  addDivisionTwo(){
    const data=this.divisionTwoForm.value;
        this.countryService.insertDivisionTwo(data).subscribe({
      next: (response) => {
        console.log(response);
        
        if(response.message=="Success"){
          this.sweetalert.showToast('success','Successfully created.');
          this.divisionTwo.push(data);
          this.getDivisionTwoByDivisionOneId(data.id_t2_1_div1);
          this.divisionTwoForm.patchValue({
            t2_1_div2_name:''
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

  editDivisionTwo(divisionTwo:any){
    (async () => {
      const inputValue = divisionTwo.t2_1_div2_name;
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
          id_t2_1_div1:divisionTwo.id_t2_1_div1,
          id_t2_1_div2:divisionTwo.id_t2_1_div2,
          t2_1_div2_name:name
        }
        this.countryService.updateDivisionTwo(data).subscribe({
                next: (response) => {
                  if(response.message=="Success"){
                    this.sweetalert.showToast('success','Successfully created.');
                    const index = this.divisionTwo.findIndex(item => item.id_t2_1_div2 === data.id_t2_1_div2);
                      if (index !== -1) {
                        this.divisionTwo[index] = { ...this.divisionTwo[index], ...data };
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

  removeDivisionTwo(id:any){
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
        this.countryService.deleteDivisionTwo(id).subscribe({
          next: (res) => {
            if(res.message=="Success"){
              this.sweetalert.showToast('success','Succefully deleted');
              this.divisionTwo = this.divisionTwo.filter(item => item.id_t2_1_div2 !== id);
            }
          },
          error: (error) => {
            this.sweetalert.showToast('error','Oops! Something went wrong.');
          },
        });
       
      }
    });
  }
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


  onChangeDivisiontwo(event: Event): void {
    const selectElement = event.target as HTMLSelectElement; 
    const divisionOneId = selectElement.value; 
  this.getDivisionTwoByDivisionOneId(divisionOneId);
  }

  getDivisionTwoByDivisionOneId(divisionOneId:string){
    const body = { 
      filters: { 
        id_t2_1_div1: divisionOneId
      }
    };
    this.countryService.getDivisionTwoByDivisionOneId(body).subscribe({
      next: (res) => {
        this.divisionTwo = res.data.Items;
        console.log('Division Two:', this.divisionTwo);
      },
      error: (error) => {
        console.error('Failed to load Division Two:', error);
      },
    });
  }
  

  onClose(){
    this.closePopup();
    this.router.navigate(['/components/country'])
  }

}
