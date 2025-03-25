import { isPlatformBrowser } from '@angular/common';
import { Component, Inject, PLATFORM_ID, AfterViewInit, Input, OnInit, HostListener } from '@angular/core';
import { AuthService } from '../../../Services/authService/auth.service';
import Swal from 'sweetalert2';
import { LocalstorageService } from '../../../Services/localStorageService/localstorage.service';
import { Router } from '@angular/router';



@Component({
  selector: 'app-full',
  templateUrl: './full.component.html',
  styleUrl: './full.component.css'
})
export class FullComponent implements OnInit {
  isShow = false;
  role:any
  constructor(
    @Inject(PLATFORM_ID) private platformId: any,
    private authService: AuthService,private router:Router,private localStorageService:LocalstorageService, private localstorageService: LocalstorageService) { }
  async ngOnInit(): Promise<void> {
    this.checkScreenSize();
    this.role = await this.localstorageService.getItem('role')
    if (this.role == "User") {
      this.router.navigate(['/user/home']);
    }
    else {
      this.isShow = true;
    }
  }

  logout() {

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

  // ==========================================================================================================================

  isSidebarExpanded: boolean = true;

  toggleSidebar() {
    this.isSidebarExpanded = !this.isSidebarExpanded;
  }

   // Listen for window resize events
   @HostListener('window:resize', [])
   onWindowResize() {
     this.checkScreenSize();
   }
 
   checkScreenSize() {
     if (window.innerWidth < 768) {
       this.isSidebarExpanded = false;
     } else {
       this.isSidebarExpanded = true;
     }
   }

}
