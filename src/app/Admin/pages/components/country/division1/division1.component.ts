import { Component, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-division1',
  templateUrl: './division1.component.html',
  styleUrl: './division1.component.css'
})
export class Division1Component {

  divisionOneForm: FormGroup;
  @Output() closePopup = () => {};
  @Input() locationData: any;
  constructor(private router:Router,private fb: FormBuilder)
  {
 
    this.divisionOneForm = this.fb.group({
      div1: [''],
      country: [[]],
    });
  }
  states: string[] = [
    'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh', 'Goa', 
    'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka', 'Kerala', 
    'Madhya Pradesh', 'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram', 'Nagaland', 
    'Odisha', 'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu', 'Telangana', 'Tripura', 
    'Uttar Pradesh', 'Uttarakhand', 'West Bengal', 'Andaman and Nicobar Islands', 
    'Chandigarh', 'Dadra and Nagar Haveli and Daman and Diu', 'Lakshadweep', 'Delhi', 
    'Puducherry'
  ];
  onClose() {
    this.closePopup();
    this.router.navigate(['/components/country'])
  }

  onSubmit(): void {
      if (this.divisionOneForm.valid) {
        const newLocation = this.divisionOneForm.value;
        // this.locations.push(newLocation); // Add new location to the list
        this.divisionOneForm.reset(); // Reset the form
      }
    }
    addItem(): void {
      const newState = this.divisionOneForm.get('div1')?.value.trim();
      if (newState && !this.states.includes(newState)) {
        this.states.push(newState);  // Add new state to the list
        this.divisionOneForm.get('div1')?.reset();  // Clear the input field
      }
    }
    editDivisionOne(state: string): void { 
      const newState = prompt('Edit state:', state);
      if (newState) {
        const index = this.states.indexOf(state);
        if (index !== -1) {
          this.states[index] = newState;  // Update the state name
        }
      }
    }
    removeDivisionOne(state: string): void {
      const index = this.states.indexOf(state);
      if (index !== -1) {
        this.states.splice(index, 1);  // Remove the state from the list
      }
   }
}
