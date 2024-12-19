import { Routes } from '@angular/router';
import { TestComponent } from './test/test.component';
import { IndexpageComponent } from './indexpage/indexpage.component';
import { AddpopupComponent } from './indexpage/addpopup/addpopup.component';
import { CountryComponent } from './country/country.component';
import { CompanyTypeComponent } from './constant/company-type/company-type.component';


export const ComponentRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'test',
        component: TestComponent,
      },
      {
        path: 'index',
        component: IndexpageComponent,
      },
      {
        path: 'country',
        component: CountryComponent,
      },
      {
        path: 'company-type',
        component: CompanyTypeComponent,
      },
      
      {
        path: '',
        children: [
          {
            path: 'index',
            component: IndexpageComponent,
          },
          {
            path: 'index/addpopup',
            component: AddpopupComponent,
          },
        ],
      },
    ],
  },
];