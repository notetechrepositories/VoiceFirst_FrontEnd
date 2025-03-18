import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { LocalstorageService } from '../localStorageService/localstorage.service';
import { Router } from '@angular/router';
import { environment } from '../../../environment/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  private apiUrl = environment.apiUrl;

  token!: string | null;

  constructor(
    private localStorageService:LocalstorageService,
    private router:Router,
    private http: HttpClient
    ) { }

    login(data:any){
      return this.http.post<any>(`${this.apiUrl}/auth/login`,data);
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
    this.router.navigate(['']);
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

  // ---------- Forgot Password--------------

  forgotPassword(username:string){
    return this.http.post<any>(`${this.apiUrl}/auth/forgot-password?userName=${username}`,{});
  }

  verifyOtp(data:any){
    return this.http.post<any>(`${this.apiUrl}/auth/verification-otp`,data);
  }

  resetPassword(data:any){
    return this.http.post<any>(`${this.apiUrl}/auth/reset-password`,data);
  }

  // --------------------------------------------------------------------------------------------

  encryptedOtp: string = '';
  userId: string = '';
  username: string = '';
  timerExpiration: number = 0;  // Stores timer expiration to handle refresh

  setEncryptedOtp(otp: string, username:string ,duration: number) {
    this.encryptedOtp = otp;
    this.username=username;
    this.timerExpiration = Date.now() + duration * 1000;  // 60 seconds in milliseconds
  }

  getRemainingTime(): number {
    const remainingTime = this.timerExpiration - Date.now();
    return remainingTime > 0 ? remainingTime / 1000 : 0;
  }

  setUserId(userId: string) {
    this.userId = userId;
  }
 
  
}
