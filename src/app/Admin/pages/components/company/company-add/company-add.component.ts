import { Component, ComponentFactoryResolver, Output, ViewChild, ViewContainerRef } from '@angular/core';
import { Router } from '@angular/router';
import Stepper from 'bs-stepper';



@Component({
  selector: 'app-company-add',
  templateUrl: './company-add.component.html',
  styleUrl: './company-add.component.css'
})
export class CompanyAddComponent {
  @Output() closePopup = () => {};

  constructor(private router:Router){}

  private stepper!: Stepper;

  next() {
    this.stepper.next();
  }

  onSubmit() {
    return false;
  }

  ngOnInit() {
    const stepperElement = document.querySelector('#stepper1');
    if (stepperElement) {
      this.stepper = new Stepper(stepperElement, {
        linear: false,
        animation: true
      });
    } else {
      console.error("Stepper element not found!");
    }
  }



  onClose() {
    alert('Are sure you want to stop registering company');
    this.closePopup();
    this.router.navigate(['/components/company'])
    
  }

  onSave() {
    alert('Company Added!');
    this.closePopup();
  }
}
