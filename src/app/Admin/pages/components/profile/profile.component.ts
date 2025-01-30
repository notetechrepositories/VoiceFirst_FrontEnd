import { Component } from '@angular/core';
import { LocalstorageService } from '../../../../Services/localStorageService/localstorage.service';
import { jwtDecode } from 'jwt-decode';
import { UserService } from '../../../../Services/userService/user.service';



@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {

  constructor(
    private localStorageService:LocalstorageService,
    private userService:UserService
  ){}
  
  ngOnInit(){
    this.getDecodedToken();
  }

  getDecodedToken(): any {
    try {
      const token=this.localStorageService.getItem('token') as string;
      return jwtDecode(token);
    } catch (error) {
      console.error('Invalid JWT Token:', error);
      return null;
    }
  }

  getUserDetails(){
    const filter = { 
      filters: { 
        id_t5_users: "0" 
      }
    };  
    this.userService.getUserDetails(filter)
  }

}


