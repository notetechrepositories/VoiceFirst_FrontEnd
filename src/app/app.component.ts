import { AfterViewInit, Component, OnInit } from '@angular/core';
import { AuthService } from './Services/authService/auth.service';
declare var bootstrap: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements AfterViewInit, OnInit{
  title = 'VoiceFirst';

  constructor(
    private authService:AuthService
  ){}
  
  ngOnInit(){
    // console.log(this.authService.isTokenExpired());
    // if (this.authService.isTokenExpired()) {
    //   this.authService.logout();
    // }
  }

  ngAfterViewInit() {
    const tooltipTriggerList = Array.from(
      document.querySelectorAll('[data-bs-toggle="tooltip"]')
    );
    tooltipTriggerList.forEach((tooltipTriggerEl) => {
      new bootstrap.Tooltip(tooltipTriggerEl);
    });
  }
}
