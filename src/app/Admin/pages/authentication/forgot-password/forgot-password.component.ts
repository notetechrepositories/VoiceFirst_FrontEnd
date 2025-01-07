import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../../Services/authService/auth.service';
import { Router } from '@angular/router';
import { SweetalertService } from '../../../../Services/sweetAlertService/sweetalert.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.css'
})
export class ForgotPasswordComponent {

  forgotForm!:FormGroup;
  encryptedOtp!:string;
  username!:string;
  userId!:string;

  loading = false;
  
  constructor(
    private fb: FormBuilder,
    private authService:AuthService,
    private router: Router,
    private sweetalert:SweetalertService
  ){
        this.forgotForm = this.fb.group({
          username: ['', [Validators.required]],
        });

  }


  // --------------- username ---------------

  onSubmit() {
    if (this.loading) return; // Prevent multiple clicks
    this.loading = true;
    this.username = this.forgotForm.value.username;
    this.authService.forgotPassword(this.username).subscribe({
      next: (res) => {
        if (res.status == 200) {
          this.encryptedOtp = res.data.encryptedOtp;
          this.router.navigate(['/authentication/otp-verification']);
          this.authService.setEncryptedOtp(this.encryptedOtp,this.username,10); 
          this.loading = false;
        }
        else{
          this.sweetalert.showToast('error',res.message);
          this.loading = false;
        }
        
      },
      error: (error) => {
        console.error('Error:', error);
        this.loading = false;
      }
    });
  }
  


}
