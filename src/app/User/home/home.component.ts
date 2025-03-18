import { Component, HostListener } from '@angular/core';
import { BrachService } from '../../Services/branchService/brach.service';
import { Router } from '@angular/router';
import { AuthService } from '../../Services/authService/auth.service';
import { LocalstorageService } from '../../Services/localStorageService/localstorage.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  searchQuery: string = '';
  filteredBusinesses: any[] = [];
  businesses: any[]=[];
  userType:any;

  constructor(private branchservice:BrachService,private authService:AuthService,private router:Router,private localStorageService:LocalstorageService){}

  ngOnInit(){
    this.getBranch();


  }

  onSearch() {
    if (this.searchQuery.trim()) { // Ensure query is not empty
      this.filteredBusinesses = this.businesses.filter(business =>
        business.t2_company_branch_name.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        business.t2_1_local_name.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        business.t2_1_div1_name.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        business.t2_1_div2_name.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        business.t2_1_div3_name.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        business.t2_1_local_name.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    } else {
      this.filteredBusinesses = []; // Hide suggestions if query is empty
    }
  }

  selectBusiness(business: any) {
    this.searchQuery = business.t2_company_branch_name;
    this.router.navigate(['user/commercial'])
    // this.filteredBusinesses = []; // Hide suggestions after selection
  }


  getBranch(): void {
    const body = { 
      filters: { 
  
      }
    };
  
    this.branchservice.getBranch(body).subscribe({
      next: (res) => {
        console.log(res);
        this.businesses = res.data.Items || [];
        console.log(this.businesses);
      },
      error: (error) => {
        console.log('Failed to load locations:', error);
        this.businesses = [];
      },
    });       
  }
}
