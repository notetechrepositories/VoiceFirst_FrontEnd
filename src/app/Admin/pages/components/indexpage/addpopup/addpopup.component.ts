import { Component, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-addpopup',
  templateUrl: './addpopup.component.html',
  styleUrl: './addpopup.component.css'
})
export class AddpopupComponent {
  @Output() closePopup = () => {};

  constructor(private router:Router){}

  onClose() {
    this.closePopup();
    this.router.navigate(['/index'])
  }

  onSave() {
    alert('Company Added!');
    this.closePopup();
  }
}
