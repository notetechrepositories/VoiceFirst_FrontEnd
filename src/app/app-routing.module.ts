import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FullComponent } from './Admin/layout/full/full.component';
import { BlankComponent } from './Admin/layout/blank/blank.component';
import { AuthGuard } from './authGuard/auth.guard';
import { SubscriptionComponent } from './Admin/layout/subscription/subscription.component';
import { NavbarComponent } from './User/navbar/navbar.component';
import { LandingpageComponent } from './User/landingpage/landingpage.component';
import { NotfoundComponent } from './User/notfound/notfound.component';
import { TestComponent } from './Test/test/test.component';

export const routes: Routes = [

  {
    path: '',
    component: NavbarComponent,
    children: [
      {
        path: '',
        component: LandingpageComponent, // Default landing page component
      },
      {
        path: 'landing',
        component: LandingpageComponent, // Default landing page component
      },
      {
        path: 'user',
        loadChildren: () =>
          import('./User/user.module').then((m) => m.UsersModule),
      },
      
      {
        path: 'authentication',
        loadChildren: () =>
          import('./Admin/pages/authentication/authentication.module').then(
            (m) => m.AuthenticationModule
          ),
      },
      {
        path:'subscription',
        component:SubscriptionComponent
      }
    ],
  },

  {
    path: 'company',
    component: FullComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./Admin/pages/pages.module').then((m) => m.PagesModule),
      },
      {
        path: '',
        loadChildren: () =>
          import('./Admin/pages/components/component.module').then(
            (m) => m.ComponentModule
          ),
      },
    ],
  },

  {
    path: '',
    component: BlankComponent,
    children: [
      {
        path: 'test',
        component:TestComponent
      },

    ],
  },
  {
        path: '**',
        component: NotfoundComponent,
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
