import { Component, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-role',
  templateUrl: './add-role.component.html',
  styleUrl: './add-role.component.css'
})
export class AddRoleComponent {
  @Output() closePopup = () => {};

  constructor(private router:Router){}

  onClose() {
    this.closePopup();
    this.router.navigate(['/components/role'])
  }

  onSave() {
    alert('Company Added!');
    this.closePopup();
  }
}
