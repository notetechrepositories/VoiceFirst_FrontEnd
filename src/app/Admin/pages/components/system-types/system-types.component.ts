import { Component, ComponentFactoryResolver, ViewChild, ViewContainerRef } from '@angular/core';
import Swal from 'sweetalert2';
import { SweetalertService } from '../../../../Services/sweetAlertService/sweetalert.service';
import { AddTypeComponent } from './add-type/add-type.component';
import { SystemtypeService } from '../../../../Services/systemTypeService/systemtype.service';
import { EditTypeComponent } from './edit-type/edit-type.component';

@Component({
  selector: 'app-system-types',
  templateUrl: './system-types.component.html',
  styleUrl: './system-types.component.css'
})
export class SystemTypesComponent {
 constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    private sweetalert: SweetalertService,
    private sysTypeService:SystemtypeService
  ) {}

  types:any[]=[]
  itemsPerPage = 12;
  currentPage = 1;

  filteredtype: any[] = [];
  paginatedOrders: any[] = [];

  searchTerm = '';

  isLoading: boolean = false; 

  ngOnInit() {
    this.getAllSystemType();
  }

  get totalPages(): number {
    return Math.ceil(this.filteredtype.length / this.itemsPerPage);
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updatePaginatedOrders();
    }
  }

  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updatePaginatedOrders();
    }
  }

  updatePaginatedOrders() {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    this.paginatedOrders = this.filteredtype.slice(start, end);
  }

  applyFilters(event:Event) {
    const selectElement = event.target as HTMLSelectElement;
    const selectionid = selectElement.value;
    if (selectionid === '') {
      this.paginatedOrders = [...this.filteredtype];
    } else {
      this.paginatedOrders = this.filteredtype.filter(item => item.id_t4_selection === selectionid);
    }
  }

  // -------------------------------------------------------------------------------

  getAllSystemType(){
    const filterbody = { 
      filters: {
        is_delete:"0"
      }
    };
    this.sysTypeService.getAllSystemType(filterbody).subscribe({
      next:res=>{
        this.types = res.data.Items;
          console.log(res);
          this.filteredtype = [...this.types];
          this.updatePaginatedOrders();
        
      },
      error:error=>{
        console.log(error);
        
      }
    })
  }

  // ----------------------------------POP UP----------------------------------------

  @ViewChild('popupContainer', { read: ViewContainerRef })
  popupContainer!: ViewContainerRef;

  openAddRole() {
    this.popupContainer.clear();
    const factory =
      this.componentFactoryResolver.resolveComponentFactory(AddTypeComponent );
    const componentRef = this.popupContainer.createComponent(factory);
    componentRef.instance.closePopup = () => {
      this.popupContainer.clear();
      this.getAllSystemType();
    };
  }

  openEditRole(id: string) {
    this.popupContainer.clear();
    const filterbody = { 
      filters: { 
        id_t4_sys_selection_values: id
      }
    };
    this.sysTypeService.getAllSystemType(filterbody).subscribe({
      next: (res) => {
        const factory =
          this.componentFactoryResolver.resolveComponentFactory(
            EditTypeComponent
          );
        const componentRef = this.popupContainer.createComponent(factory);
        componentRef.instance.typeData = res.data;
        componentRef.instance.closePopup = () => {
          this.popupContainer.clear();
          this.getAllSystemType();
        };
      },
      error: (error) => {},
    });
  }

  deleteFn(id: string) {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.sysTypeService.deleteSysType(id).subscribe({
          next:res=>{
            if(res.status==200){
              this.getAllSystemType();
              this.sweetalert.showToast('success', 'Succefully deleted');
            }
            else{
              this.sweetalert.showToast('error', res.message);
            }
          }
        })
      }
    });
  }
}
