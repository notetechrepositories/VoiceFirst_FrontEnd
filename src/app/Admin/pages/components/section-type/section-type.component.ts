import { Component } from '@angular/core';
import { SweetalertService } from '../../../../Services/sweetAlertService/sweetalert.service';
import { SystemtypeService } from '../../../../Services/systemTypeService/systemtype.service';

@Component({
  selector: 'app-section-type',
  templateUrl: './section-type.component.html',
  styleUrl: './section-type.component.css'
})
export class SectionTypeComponent {
  sysSectionTypes: any[] = []; // fetched system section types from API
  selectedSectionTypes: any[] = []; // user-selected section types

  newSectionType: string = '';
  showAddSectionTypeModal: boolean = false;

  constructor(
    private sweetalert: SweetalertService,
    private sysTypeService: SystemtypeService
  ) {}

  ngOnInit() {
    this.getSectionTypes();
  }

  toggleSectionTypeSelection(sectionType: string): void {
    const index = this.selectedSectionTypes.indexOf(sectionType);
    if (index === -1) {
      this.selectedSectionTypes.push(sectionType);
    } else {
      this.selectedSectionTypes.splice(index, 1);
    }
  }

  openAddSectionTypeModal(): void {
    this.newSectionType = '';
    this.showAddSectionTypeModal = true;
  }

  closeAddSectionTypeModal(): void {
    this.showAddSectionTypeModal = false;
  }

  getSectionTypes(): void {
    const sectionTypeId = "a1136325-b25e-4b52-aa7c-241db7214039";
    this.sysTypeService.getSysTypeById(sectionTypeId).subscribe({
      next: res => {
        console.log(res);
        this.sysSectionTypes = res.data.Items;
        console.log(this.sysSectionTypes);
      },
      error: error => {
        console.log(error);
      }
    });
  }

  addNewSectionType(): void {
    const trimmedSectionType = this.newSectionType.trim();

    if (!trimmedSectionType) {
      alert('Section Type name cannot be empty!');
      return;
    }

    if (this.selectedSectionTypes.includes(trimmedSectionType)) {
      alert('This Section Type is already selected!');
      return;
    }

    this.selectedSectionTypes.push(trimmedSectionType);
    this.closeAddSectionTypeModal();
  }

  removeSelectedSectionType(sectionType: string): void {
    const index = this.selectedSectionTypes.indexOf(sectionType);
    if (index !== -1) {
      this.selectedSectionTypes.splice(index, 1);
    }
  }

  isSelectedSectionType(sectionType: string): boolean {
    return this.selectedSectionTypes.includes(sectionType);
  }

  onSubmit(): void {
    if (this.selectedSectionTypes.length > 0) {
      this.sweetalert.showToast('success', 'Section Types Added Successfully');
    }
  }
}
