import { Component, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CountryService } from '../../../../../Services/countryService/country.service';



@Component({
  selector: 'app-division1',
  templateUrl: './division1.component.html',
  styleUrl: './division1.component.css'
})
export class Division1Component {

  divisionOneForm: FormGroup;
  @Output() closePopup = () => {};
  @Input() locationData: any;
  divisionOne:any[]=[];

  constructor(private router:Router,private fb: FormBuilder,private countryService :CountryService)
  {
    this.divisionOneForm = this.fb.group({
      t2_1_div1_name: ['',Validators.required] ,
      country: [[]],
    });
  }
  newDivisionOne:any[]=[];
  division:any[]=[];
  ngOnInit(): void {
    if (this.locationData) {
      this.division = this.locationData.Items;
      this.divisionOne = []; // Ensure it's an array to store all division names
    
      for (let i = 0; i < this.division.length; i++) {
        this.divisionOne.push(this.division[i].t2_1_div1_name);
      }
    }
  }

  onClose() {
    this.closePopup();
    this.router.navigate(['/components/country'])
  }
  
  addDivisionOne(): void {
    if(this.divisionOneForm.valid){
     const newDivisionOne = this.divisionOneForm.get('t2_1_div1_name')?.value.trim();
      if ( this. newDivisionOne && !this.newDivisionOne.includes( newDivisionOne)) {
        this.newDivisionOne.push(newDivisionOne);
        this.divisionOne.push( this. newDivisionOne);
        this.divisionOneForm.get('t2_1_div1_name')?.reset();  // Clear the input field
      }
       console.log( this. newDivisionOne);
    }
    else{
      this.divisionOneForm.markAllAsTouched();
    }

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

    editDivisionOne(divisionOne: string): void { 
      const data=this.divisionOneForm.value;
      console.log(data);
      
      this.countryService.updateDivisionOne(data).subscribe({
        next: (response) => {
          console.log('Location updated successfully:', response);
          this.closePopup();
          this.divisionOneForm.reset();
        },
        error: (error) => {
          console.error('Error adding location:', error);
          alert('Failed to add location.');
        },
      });
    }
    // ---------------Delete--------------------------------
    removeDivisionOne(divisionOne: any): void {
      
      this.countryService.deleteDivisionOne(divisionOne).subscribe({
        next: () => {
          // this.getLocations();  
          console.log('Location deleted:', location);
        },
        error: (error) => {
          console.error('Failed to delete location:', error);
        },
      });

    }
}
