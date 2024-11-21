import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { LocalstorageService } from '../localStorageService/localstorage.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  token!: string | null;

  constructor(
    private localStorageService:LocalstorageService,
    private router:Router
    ) { }

  login(user_name: string, password: string): Observable<any> {
    const loginPayload = {
      user_name,
      password,
    };
    const randomToken = Math.random().toString(36).substring(2); // Generate a random string for the token

    if (user_name === 'admin@notetech.com' && password === '12345') {
      console.log("Admin login");
      return of({ message: 'Login successful', role: 'admin' , token :randomToken});
    } else if (user_name === 'company@gmail.com' && password === '12345') {
      return of({ message: 'Login successful', role: 'company', token :randomToken });
    } else {
      return throwError(() => new Error('Invalid login credentials'));
    }
  }

  isLoggedIn(): boolean {
      this.token = this.localStorageService.getItem('token');
      const role = this.localStorageService.getItem('role');
      if(this.token){
        return !!this.token;
      }
      else{
        return false;
      }
  }

  logout(): void {
    this.localStorageService.clear();
    this.router.navigate(['/authentication/login']);
  }


  validateToken(): Promise<void> {
    return new Promise((resolve) => {
      if (this.token) {
        resolve(); 
      } else {
        resolve(); 
      }
    });
  }

  
}
