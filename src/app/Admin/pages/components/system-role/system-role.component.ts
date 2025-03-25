import { Component, ComponentFactoryResolver, ViewChild, ViewContainerRef } from '@angular/core';
import { SweetalertService } from '../../../../Services/sweetAlertService/sweetalert.service';
import Swal from 'sweetalert2';
import { AddRoleComponent } from '../role/add-role/add-role.component';
import { RoleService } from '../../../../Services/roleService/role.service';
import { Role } from '../../../Models/role_model';
import { EditRoleComponent } from '../role/edit-role/edit-role.component';
import { AddSystemRoleComponent } from './add-system-role/add-system-role.component';
import { EditSystemRoleComponent } from './edit-system-role/edit-system-role/edit-system-role.component';

@Component({
  selector: 'app-system-role',
  templateUrl: './system-role.component.html',
  styleUrl: './system-role.component.css'
})
export class SystemRoleComponent {
  constructor(
      private componentFactoryResolver: ComponentFactoryResolver,
      private sweetalert: SweetalertService,
      private roleService: RoleService
    ) {}
  
    roles: Role[] = [];
    itemsPerPage = 12;
    currentPage = 1;
  
    filteredRoles: Role[] = [];
    paginatedOrders: any[] = [];
  
    searchTerm = '';
  
    isLoading: boolean = false; 
  
    ngOnInit() {
      this.getAllSystemRole();
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
  
    getAllSystemRole() {
      this.isLoading = true;
      // const body = { 
      //   filters: { 
      //     is_delete: "0" 
      //   }
      // };  
      this.roleService.getSystemRole().subscribe({
        next: (res) => {
          console.log(res);
          
          if (res.status == 200) {
            this.roles = res.data.Items;
            console.log(res);
            this.filteredRoles = [...this.roles];
            this.updatePaginatedOrders(); 
          }
          this.isLoading = false; 
        },
        error: (error) => {
          console.log(error);
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
        this.componentFactoryResolver.resolveComponentFactory(AddSystemRoleComponent);
      const componentRef = this.popupContainer.createComponent(factory);
      componentRef.instance.closePopup = () => {
        this.popupContainer.clear();
        this.getAllSystemRole();
      };
    }
  
    openEditRole(systemrole: string) {
       this.popupContainer.clear();
       const factory = this.componentFactoryResolver.resolveComponentFactory(EditSystemRoleComponent);
       const componentRef = this.popupContainer.createComponent(factory);
       componentRef.instance.roleData = systemrole;
       componentRef.instance.closePopup = () => {
         this.popupContainer.clear();
         this.getAllSystemRole();
       };
   



      // this.popupContainer.clear();
      // this.roleService.getSystemRole().subscribe({
      //   next: (res) => {
      //     const factory =
      //       this.componentFactoryResolver.resolveComponentFactory(
      //         EditSystemRoleComponent
      //       );
      //     const componentRef = this.popupContainer.createComponent(factory);
      //     componentRef.instance.roleData = res.data;
      //     componentRef.instance.closePopup = () => {
      //       this.popupContainer.clear();
      //       this.getAllSystemRole();
      //     };
      //   },
      //   error: (error) => {},
      // });
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
          this.roleService.deleteSystemRole(id).subscribe({
            next:res=>{
              if(res.status==200){
                this.getAllSystemRole();
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
