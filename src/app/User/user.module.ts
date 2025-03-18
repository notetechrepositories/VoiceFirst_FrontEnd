import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HomeComponent } from './home/home.component';
import { UsersRoutes } from './user.routing.module';
import { BranchDetailComponent } from './branch-detail/branch-detail.component';
import { LandingpageComponent } from './landingpage/landingpage.component';




@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(UsersRoutes),
    RouterOutlet
    
  ],
  declarations: [
    HomeComponent,
    BranchDetailComponent,
    LandingpageComponent
  ],
  exports: [],
})
export class UsersModule {}