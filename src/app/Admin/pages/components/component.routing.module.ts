import { Routes } from '@angular/router';
import { TestComponent } from './test/test.component';
import { IndexpageComponent } from './indexpage/indexpage.component';
import { AddpopupComponent } from './indexpage/addpopup/addpopup.component';


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