import { Component } from '@angular/core';
import { AuthService } from '../../../../Services/authService/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LocalstorageService } from '../../../../Services/localStorageService/localstorage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginForm!: FormGroup;
  error: string = '';
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private localStorageService: LocalstorageService
  ) {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(5)]],
    });
  }

  ngOnInit(): void {
    this.error='';

  }

  onLogin(): void {
    if (this.loginForm.valid) {
      const loginData = this.loginForm.value;
      this.authService.login(loginData).subscribe({
        next: (res) => {
          console.log(res);
          if (res.status == 200) {
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
