import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../../Services/authService/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { SweetalertService } from '../../../../Services/sweetAlertService/sweetalert.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.css'
})
export class ResetPasswordComponent {

  userId!: string;

  resetForm!:FormGroup;

 constructor(
      private fb: FormBuilder,
      private authService:AuthService,
      private route: ActivatedRoute,
      private router: Router,
      private sweetalert:SweetalertService
    ){
      this.resetForm = this.fb.group(
        {
          password1: ['', [Validators.required]],
          password2: ['', [Validators.required]],
        },
        {
          validators: this.passwordsMatchValidator,
        }
      );
  
    }

    ngOnInit() {
      this.userId=this.authService.userId;
      if(!this.userId){
        this.router.navigate(['/authentication/forgot-password']);
      }
    }

    passwordsMatchValidator(form: FormGroup) {
      const password1 = form.get('password1')?.value;
      const password2 = form.get('password2')?.value;
  
      if (password1 && password2 && password1 !== password2) {
        return { passwordsMismatch: true };
      }
      return null;
    }

    onSubmit(){
      if (this.resetForm.valid) {
        const requestBody={
          user_id: this.userId,
          password:this.resetForm.value.password2
        }

        
        this.authService.resetPassword(requestBody).subscribe({
          next:res=>{
            console.log(res);
            if(res.status==200){
              this.sweetalert.showToast('success','Password reset successfully')
              this.router.navigate(['/authentication/login']);
            }
          },
          error:error=>{
            this.sweetalert.showToast('error','Reset Failed')
          }
        })

    }
    }
}
