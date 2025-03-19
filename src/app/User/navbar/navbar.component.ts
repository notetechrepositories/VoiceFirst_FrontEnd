import { Component, HostListener, OnInit } from '@angular/core';
import { AuthService } from '../../Services/authService/auth.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { LocalstorageService } from '../../Services/localStorageService/localstorage.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  isMenuOpen = false;
  isloggedin : boolean=false;
  isloginVisible :boolean=false;

    userType:any;
  
    constructor(
      private authService:AuthService,
      private router:Router,
      private localStorageService:LocalstorageService,
      private fb: FormBuilder){
        
      }
  


  async ngOnInit(): Promise<void> {
    this.checkScreenSize();
    this.userType = await this.localStorageService.getItem('role');
    if (await this.authService.isLoggedIn()) {
      if(this.userType =="Notetech" || this.userType =="Company"){
        // this.router.navigate(['/company']);
      }
      else{
        // this.router.navigate(['user/home']);
        this.isloggedin=true;
      }
    }
    else{
      this.router.navigate(['']);
      this.isloggedin=false ;
    }
    this.error='';
    this.loginFormInit();
  }

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;

    // Disable scrolling when the menu is open
    if (this.isMenuOpen) {
      document.body.classList.add('no-scroll');
    } else {
      document.body.classList.remove('no-scroll');
    }
  }

  onMenuClick(){
    if(this.isMenuOpen){
      this.isMenuOpen=false;
    }
  }

  // Listen for window resize events
  @HostListener('window:resize', ['$event'])
  onResize(event: Event): void {
    this.checkScreenSize();
  }

  private checkScreenSize(): void {
    if (window.innerWidth > 1490) {
      this.isMenuOpen = false;
      document.body.classList.remove('no-scroll'); // Reset scrolling
    }
  }

  //================ Scrolling=================

  showScroll: boolean = false; // Controls visibility of the button
  scrollThreshold: number = 200; // Show button after scrolling down 200px

  // Scroll to Top
  scrollToTop(): void {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }

  // Listen to window scroll events
  @HostListener('window:scroll', [])
  onWindowScroll() {
    const scrollPosition =
      window.pageYOffset ||
      document.documentElement.scrollTop ||
      document.body.scrollTop ||
      0;

    this.showScroll = scrollPosition > this.scrollThreshold;
  }


// ============================================================================


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
      this.isloggedin=false;
    }
  });

}


// ==============================================

loginForm!: FormGroup;
error: string = '';

openLogin(){
  this.isloginVisible=true;
}
onClose(){
  this.isloginVisible=false;
}



  loginFormInit(){
    this.loginForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(5)]],
    });
  }

  onLogin(): void {
    if (this.loginForm.valid) {
      const loginData = this.loginForm.value;
      this.authService.login(loginData).subscribe({
        next: (res) => {
          console.log(res);
          if (res.status == 200) {
            this.onClose();
            this.localStorageService.setItem('token', res.data.token);
            this.localStorageService.setItem('role', res.data.role);
            if(res.data.role =="Notetech" || res.data.role == "Company"){
              this.router.navigate(['/company']);
            }
            else{
              this.router.navigate(['/user/home']);
            }
            
          }
          else {
            this.error = res.message;
          }
        },
        error: (error) => {
          console.error(error);
        },
      });
    }
  }



}




