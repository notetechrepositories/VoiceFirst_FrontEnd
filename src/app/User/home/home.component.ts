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
    this.localStorageService.removeItem('branchId');

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
    localStorage.setItem('branchId',business.id_t2_company_branch);
    this.router.navigate(['user/commercial'])
 
  }


  getBranch(): void {

  
    this.branchservice.getBranch().subscribe({
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
