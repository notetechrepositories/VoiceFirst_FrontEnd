import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { BranchDetailComponent } from './branch-detail/branch-detail.component';



export const UsersRoutes: Routes = [
  {
    path: '',
    component: HomeComponent,
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
