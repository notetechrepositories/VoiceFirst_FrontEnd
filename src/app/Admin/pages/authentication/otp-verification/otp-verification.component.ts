import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../../Services/authService/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UtilityService } from '../../../../Services/utility.service';
import { LocalstorageService } from '../../../../Services/localStorageService/localstorage.service';
import { SweetalertService } from '../../../../Services/sweetAlertService/sweetalert.service';

@Component({
  selector: 'app-otp-verification',
  templateUrl: './otp-verification.component.html',
  styleUrl: './otp-verification.component.css'
})
export class OtpVerificationComponent {

  encryptedOtp!: string;

  username!: string;

  otpForm!:FormGroup;

  userId!:string;

  timeLeft: number = 0;

  verifyButton:boolean=true;

  timerInterval: any;

  loading=false;

  otpPage=true;


  constructor(
      private fb: FormBuilder,
      private authService:AuthService,
      private route: ActivatedRoute,
      private router: Router,
      private utilityService: UtilityService,
      private localStorageService:LocalstorageService,
      private sweetalert:SweetalertService
    ){
          this.otpForm = this.fb.group({
            digit1: ['', [Validators.required, Validators.pattern('[0-9]')]],
            digit2: ['', [Validators.required, Validators.pattern('[0-9]')]],
            digit3: ['', [Validators.required, Validators.pattern('[0-9]')]],
            digit4: ['', [Validators.required, Validators.pattern('[0-9]')]],
            digit5: ['', [Validators.required, Validators.pattern('[0-9]')]],
            digit6: ['', [Validators.required, Validators.pattern('[0-9]')]],
          });
  
    }

    ngOnInit() {
      this.route.queryParams.subscribe((params) => {
        this.encryptedOtp = params['otp'];
        this.username = params['username'];
      });
       this.startTimer();
       if(!this.encryptedOtp){
        this.otpPage=false
       }
    }

    startTimer(){
        this.utilityService.startTimer(60).subscribe((time) => {
          this.timeLeft = time;
          if(this.timeLeft==0){
            this.verifyButton=false;
          }
        });
    }


    moveToNext(event: KeyboardEvent, nextControlName: string, prevControlName: string): void {
      const input = event.target as HTMLInputElement;
    
      if (event.key === 'Backspace' && input.value.length === 0) {
        const prevInput = document.querySelector(`[formControlName="${prevControlName}"]`) as HTMLElement;
        if (prevInput) prevInput.focus();
      } else if (input.value.length === 1 && event.key !== 'Backspace') {
        const nextInput = document.querySelector(`[formControlName="${nextControlName}"]`) as HTMLElement;
        if (nextInput) nextInput.focus();
      }
    }
    
  
    onVerifyOtp(): void {
      if (this.otpForm.valid) {
        if (this.loading) return; // Prevent multiple clicks
        this.loading = true;
        const otp = Object.values(this.otpForm.value).join('');
        console.log('Submitted OTP:', this.encryptedOtp);
        const requestBody={
          otp: otp,
          encrypted_data:this.encryptedOtp
        }
        this.authService.verifyOtp(requestBody).subscribe({
          next:res=>{
            console.log(res);
            if(res.status==200){
              this.userId=res.data.userData;
              this.router.navigate(['/authentication/reset-password'],{ queryParams: { userId: this.userId } });
              this.loading = false; 
            }
            else{
              this.loading = false;
              console.log(res); 
            }
          },
          error:error=>{
            console.log(error);
            this.loading = false;
          }
        })
      } else {
        console.log('Form is invalid');
      }
    }

    onResendOtp(){
      if (this.loading) return; // Prevent multiple clicks
      this.loading = true;
      this.encryptedOtp='';
      if(this.username){
        this.authService.forgotPassword(this.username).subscribe({
          next: (res) => {
            if (res.status === 200) {
              this.encryptedOtp = res.data.encryptedOtp;
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
      else{
        this.router.navigate(['/authentication/forgot-password']);
      }
    }
}