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
  loginForm!:FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private localStorageService:LocalstorageService
  ) {
    this.loginForm = this.fb.group({
      user_name: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(5)]],
    });
  }

  ngOnInit(): void {
    if (this.authService.isLoggedIn()) {
      this.router.navigate(['/dashboard']); // Redirect to dashboard if already logged in
    }
  }

  onLogin(): void {
    if (this.loginForm.valid) {
      const { user_name, password } = this.loginForm.value;
      this.authService.login(user_name, password).subscribe({
        next: (res) => {
          this.localStorageService.setItem('token', res.token);
          this.localStorageService.setItem('role', res.role);
          this.router.navigate(['/dashboard']);
        },
        error: (error) => {
          console.error(error);
        },
      });
    }
  }
}
