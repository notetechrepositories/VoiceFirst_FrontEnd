import {
  Component,
  ComponentFactoryResolver,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import Swal from 'sweetalert2';
import { SweetalertService } from '../../../../Services/sweetAlertService/sweetalert.service';
import { AddRoleComponent } from './add-role/add-role.component';
import { EditRoleComponent } from './edit-role/edit-role.component';
import { RoleService } from '../../../../Services/roleService/role.service';

export interface Role {
  id_t5_1_m_user_roles: string;
  t5_1_m_user_roles_name: string;
  t5_1_m_all_location_access: number;
  t5_1_m_all_location_type: number;
  t5_1_m_only_assigned_location: number;
  inserted_by: string | null;
  inserted_date: string;
  updated_by: string | null;
  updated_date: string;
}

@Component({
  selector: 'app-role',
  templateUrl: './role.component.html',
  styleUrl: './role.component.css',
})
export class RoleComponent {
  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    private sweetalert: SweetalertService,
    private roleService: RoleService
  ) {}

  roles: Role[] = [];
  itemsPerPage = 12;
  currentPage = 1;

  filteredRoles: Role[] = [];
  paginatedOrders: Role[] = [];

  searchTerm = '';

  isLoading: boolean = false; 

  ngOnInit() {
    this.getAllRole();
  }

  get totalPages(): number {
    return Math.ceil(this.filteredRoles.length / this.itemsPerPage);
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
    this.paginatedOrders = this.filteredRoles.slice(start, end);
  }

  applyFilters() {
    let roles = [...this.roles];
    if (this.searchTerm) {
      roles = roles.filter((role) =>
        role.t5_1_m_user_roles_name
          .toLowerCase()
          .includes(this.searchTerm.toLowerCase())
      );
    }
    this.filteredRoles = roles;
    this.updatePaginatedOrders();
  }

  // -------------------------------------------------------------------------------

  getAllRole() {
    this.isLoading = true; 
    this.roleService.getRole().subscribe({
      next: (res) => {
        if (res.status == 200) {
          this.roles = res.data.Items;
          this.filteredRoles = [...this.roles];
          this.updatePaginatedOrders();
        }
        this.isLoading = false; 
      },
      error: (error) => {
        this.sweetalert.showToast('error', 'Oops! Something went wrong');
        this.isLoading = false; 
      },
    });
  }

  // ----------------------------------POP UP----------------------------------------

  @ViewChild('popupContainer', { read: ViewContainerRef })
  popupContainer!: ViewContainerRef;

  openAddRole() {
    this.popupContainer.clear();
    const factory =
      this.componentFactoryResolver.resolveComponentFactory(AddRoleComponent);
    const componentRef = this.popupContainer.createComponent(factory);
    componentRef.instance.closePopup = () => {
      this.popupContainer.clear();
      this.getAllRole();
    };
  }

  openEditRole(id: string) {
    this.popupContainer.clear();
    this.roleService.getRoleandPermission(id).subscribe({
      next: (res) => {
        const factory =
          this.componentFactoryResolver.resolveComponentFactory(
            EditRoleComponent
          );
        const componentRef = this.popupContainer.createComponent(factory);
        componentRef.instance.roleData = res.data;
        componentRef.instance.closePopup = () => {
          this.popupContainer.clear();
          this.getAllRole();
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
        this.roleService.delete(id).subscribe({
          next:res=>{
            if(res.status==200){
              this.getAllRole();
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
