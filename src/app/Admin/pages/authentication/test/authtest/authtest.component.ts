import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-authtest',
  templateUrl: './authtest.component.html',
  styleUrl: './authtest.component.css'
})
export class AuthtestComponent {
 form!: FormGroup;

  userId: string | null = null;

  constructor(private fb: FormBuilder,private route:ActivatedRoute) {
    this.form = this.fb.group(
      {
        password1: ['', [Validators.required]],
        password2: ['', [Validators.required]],
      }
    );
  }


  ngOnInit(){
    this.route.queryParamMap.subscribe((params) => {
      let encryptedId = params.get('id');  // Get the 'id' from URL
      if (encryptedId) {
        // Remove all '/' characters from the encrypted user ID
        this.userId = encryptedId.replace(/\//g, '');
        console.log('Sanitized User ID:', this.userId);
      }
    });
  }

  onSubmit(){

  }
}
