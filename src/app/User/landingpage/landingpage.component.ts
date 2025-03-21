import { Component } from '@angular/core';
import { AuthService } from '../../Services/authService/auth.service';
import { Router } from '@angular/router';
import { LocalstorageService } from '../../Services/localStorageService/localstorage.service';

@Component({
  selector: 'app-landingpage',
  templateUrl: './landingpage.component.html',
  styleUrl: './landingpage.component.css'
})
export class LandingpageComponent {

  userType!:any

constructor(private authService:AuthService,private router:Router,private localStorageService:LocalstorageService){

}

ngOnInit(){
  this.userType = this.localStorageService.getItem('role');
  this.localStorageService.removeItem('branchId');
  if (this.authService.isLoggedIn()) {
    if(this.userType =='Notetech' || this.userType =="Company"){
      this.router.navigate(['company']);
    }
    else{
      this.router.navigate(['user/home']);
    }
  }
  else{
    // this.router.navigate(['']);
  }
}

}
