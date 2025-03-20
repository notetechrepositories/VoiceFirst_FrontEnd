import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

    registerForm!:FormGroup

    constructor(
      private fb:FormBuilder
    ){}

    loginFormInit(){
      this.registerForm = this.fb.group({
        username: ['', [Validators.required]],
        password: ['', [Validators.required, Validators.minLength(5)]],
      });
    }

    onRegister(){

    }

    onSignIn(){
      
    }
}
