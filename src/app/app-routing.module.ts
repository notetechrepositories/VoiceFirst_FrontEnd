import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FullComponent } from './Admin/layout/full/full.component';
import { BlankComponent } from './Admin/layout/blank/blank.component';
import { AuthGuard } from './authGuard/auth.guard';

export const routes: Routes = [
  {
    path: '',
    component: FullComponent,
    canActivate: [AuthGuard], 
    children: [
      {
        path: '',
        redirectTo: '/dashboard',
        pathMatch: 'full',
      },
      {
        path: 'dashboard',
        loadChildren: () =>
          import('./Admin/pages/pages.module').then((m) => m.PagesModule),
      },
      {
        path: 'components',
        loadChildren: () =>
          import('./Admin/pages/components/component.module').then((m) => m.ComponentModule),
      },
    ],
  },
  {
    path: '',
    component: BlankComponent,
    children: [
      {
        path: 'authentication',
        loadChildren: () =>
          import('./Admin/pages/authentication/authentication.module').then(
            (m) => m.AuthenticationModule
          ),
      },
    ],
  },
  {
    path: '**',  
    redirectTo: '/authentication/login', // Or replace with a 404 error component if desired
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}