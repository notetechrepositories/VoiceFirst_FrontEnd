import { Component } from '@angular/core';
import { SweetalertService } from '../../../../Services/sweetAlertService/sweetalert.service';
import { SystemtypeService } from '../../../../Services/systemTypeService/systemtype.service';

@Component({
  selector: 'app-branch-type',
  templateUrl: './branch-type.component.html',
  styleUrl: './branch-type.component.css'
})
export class BranchTypeComponent {
  sysBranchTypes: any[]=[]
  selectedBranchTypes: any[] = [];
  
  newBranchType: string = '';
  showAddBranchTypeModal: boolean = false;
  
  constructor(private sweetalert: SweetalertService,
    private sysTypeService:SystemtypeService
  ) {}
  
  ngOnInit(){
    this.getBranchType();
  }

  toggleBranchTypeSelection(branchType: string,id:string): void {
    const index = this.selectedBranchTypes.indexOf(branchType);
    if (index === -1) {
      const selectedBranch = {
        id: id,
        name: branchType
      };
      this.selectedBranchTypes.push(selectedBranch);
      console.log(this.selectedBranchTypes);
      
    } else {
      this.selectedBranchTypes.splice(index, 1);
    }
  }
  
  openAddBranchTypeModal(): void {
    this.newBranchType = '';
    // this.allLocationAccess = false;
    // this.allIssueAccess = false;
    this.showAddBranchTypeModal = true;
  }
  
  closeAddBranchTypeModal(): void {
    this.showAddBranchTypeModal = false;
  }

  getBranchType(){
    const branchSelectionId="dbb3999e-36ba-4d63-827f-61e19cd698f9"
    this.sysTypeService.getSysTypeById(branchSelectionId).subscribe({
      next:res=>{
        console.log(res);
        this.sysBranchTypes=res.data.Items;
        console.log(this.sysBranchTypes);
        
        
      },
      error:error=>{
        console.log(error);
        
      }
    })
  }
  
  addNewBranchType(): void {
    const trimmedBranchType = this.newBranchType.trim();
    const newBranchType = {
      id: "",
      name: trimmedBranchType
    };
    if (!trimmedBranchType) {
      alert('Branch Type name cannot be empty!');
      return;
    }
  
    if (this.selectedBranchTypes.includes(trimmedBranchType)) {
      alert('This Branch Type is already selected!');
      return;
    }
    this.selectedBranchTypes.push(newBranchType);
  }
  
  removeSelectedBranchType(branchType: string): void {
    const index = this.selectedBranchTypes.indexOf(branchType);
    if (index !== -1) {
      this.selectedBranchTypes.splice(index, 1);
    }
  }
  
  isSelectedBranchType(branchType: string): boolean {
    return this.selectedBranchTypes.includes(branchType);
  }
  
  onSubmit() {
    if (this.selectedBranchTypes.length > 0) {
      this.sweetalert.showToast('success', 'Branch Types Added Successfully');
    }
  }
  
}
