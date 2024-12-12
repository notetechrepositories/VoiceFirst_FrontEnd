import { Component, ComponentFactoryResolver, Output, ViewChild, ViewContainerRef } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-company-add',
  templateUrl: './company-add.component.html',
  styleUrl: './company-add.component.css'
})
export class CompanyAddComponent {
  @Output() closePopup = () => {};

  constructor(private router:Router){}

  onClose() {
    this.closePopup();
    this.router.navigate(['/components/company'])
  }

  onSave() {
    alert('Company Added!');
    this.closePopup();
  }
}
