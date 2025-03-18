import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { BranchDetailComponent } from './branch-detail/branch-detail.component';
import { LandingpageComponent } from './landingpage/landingpage.component';



export const UsersRoutes: Routes = [
  {
    path: '',
    component: LandingpageComponent,
  },
  {
    path: 'landing',
    component: LandingpageComponent,
  },
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'commercial',
    component: BranchDetailComponent,
  },

];
