import { Component, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-branch',
  templateUrl: './edit-branch.component.html',
  styleUrl: './edit-branch.component.css'
})
export class EditBranchComponent {
  @Output() closePopup = () => {};

  constructor(private router:Router){}

  onClose() {
    this.closePopup();
    this.router.navigate(['/components/branch'])
  }

  onSave() {
    alert('Company Added!');
    this.closePopup();
  }
}
