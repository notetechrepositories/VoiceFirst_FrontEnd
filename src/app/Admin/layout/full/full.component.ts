import { isPlatformBrowser } from '@angular/common';
import { Component, Inject, PLATFORM_ID, AfterViewInit, Input } from '@angular/core';
import { AuthService } from '../../../Services/authService/auth.service';
import Swal from 'sweetalert2';



@Component({
  selector: 'app-full',
  templateUrl: './full.component.html',
  styleUrl: './full.component.css'
})
export class FullComponent implements AfterViewInit{

  constructor(
    @Inject(PLATFORM_ID) private platformId: any,
    private authService:AuthService) {}

  ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      // Run your document-related code here
      const sidebarDropdowns = document.querySelectorAll('.sidebar-dropdown > a');
      const closeSidebar = document.getElementById('close-sidebar');
      const showSidebar = document.getElementById('show-sidebar');
      const pageWrapper = document.querySelector('.page-wrapper');

      sidebarDropdowns.forEach((dropdown) => {
        dropdown.addEventListener('click', (e: Event) => {
          e.preventDefault();
      
          const parent = (e.target as HTMLElement).parentElement!;
          const submenu = parent.querySelector('.sidebar-submenu') as HTMLElement;
      
          // Check if the current submenu is already active/open
          const isOpen = parent.classList.contains('active');
      
          // Close all submenus
          document.querySelectorAll('.sidebar-submenu').forEach((submenu) => {
            (submenu as HTMLElement).style.display = 'none';
          });
      
          // Remove active class from all dropdowns
          document.querySelectorAll('.sidebar-dropdown').forEach((dropdown) => {
            dropdown.classList.remove('active');
          });
      
          // If the current submenu was not open, open it
          if (!isOpen) {
            parent.classList.add('active');
            submenu.style.display = 'block';
          }
        });
      });
      
      closeSidebar?.addEventListener('click', () => {
        pageWrapper?.classList.remove('toggled');
      });

      showSidebar?.addEventListener('click', () => {
        pageWrapper?.classList.add('toggled');
      });
      
    }
  }

  logout(){

      Swal.fire({
        title: "Are you sure?",
        // text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, logout!"
      }).then((result) => {
        if (result.isConfirmed) {
          this.authService.logout();
        }
      });
    
  }
  
}
