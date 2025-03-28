import { Routes } from '@angular/router';
import { TestComponent } from './test/test.component';
import { IndexpageComponent } from './indexpage/indexpage.component';
import { AddpopupComponent } from './indexpage/addpopup/addpopup.component';
import { CountryComponent } from './country/country.component';
import { SelectionComponent } from './constant/selection/selection.component';
import { SelectionValuesComponent } from './constant/selection-values/selection-values.component';
import { RoleComponent } from './role/role.component';
import { CompanyComponent } from './company/company.component';
import { ProfileComponent } from './profile/profile.component';
import { BranchComponent } from './branch/branch.component';
import { CompanyViewComponent } from './company/company-view/company-view.component';
import { EmployeeComponent } from './employee/employee.component';
import { EmployeeAddComponent } from './employee/employee-add/employee-add.component';
import { EmployeeViewComponent } from './employee/employee-view/employee-view.component';
import { CompanyRoleComponent } from './company-role/company-role.component';
import { SystemRoleComponent } from './system-role/system-role.component';
import { SystemTypesComponent } from './system-types/system-types.component';
import { BranchTypeComponent } from './branch-type/branch-type.component';
import { SectionTypeComponent } from './section-type/section-type.component';
import { BuisnessActivityComponent } from './buisness-activity/buisness-activity.component';
import { CompanyBuisnessActivityComponent } from './company-buisness-activity/company-buisness-activity.component';
import { SectionComponent } from './section/section.component';
import { BranchDetailsComponent } from './branch-details/branch-details.component';
import { SectionDetailsComponent } from './section-details/section-details.component';



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
        path: 'role',
        component: RoleComponent,
      },
      {
        path: 'selection-values',
        component: SelectionValuesComponent,
      },
      {
        path: 'branch',
        component: BranchComponent,
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
      {
        path: 'profile',
        component: ProfileComponent,
      },
      {
        path: '',
        children: [
          {
            path: 'company',
            component: CompanyComponent,
          },

          {
            path: 'company/company-view',
            component: CompanyViewComponent
          },
        ]
      },
      
      {
        path: '',
        children: [
          {
            path: 'employee',
            component: EmployeeComponent,
          },

          {
            path: 'employee/employee-view',
            component: EmployeeViewComponent
          },
        ]
      },
      {
        path: 'system-role',
        component: SystemRoleComponent,
      },
      {
        path: 'company-role',
        component: CompanyRoleComponent,
      },
      {
        path: 'system-type',
        component: SystemTypesComponent,
      },
      {
        path: 'branch-type',
        component: BranchTypeComponent,
      },
      {
        path: 'section-type',
        component: SectionTypeComponent,
      },
      {
        path: 'buisness-activity',
        component: BuisnessActivityComponent,
      },
      {
        path: 'company-buisness-activity',
        component: CompanyBuisnessActivityComponent,
      },
      {
        path: 'section',
        component: SectionComponent,
      },
      {
        path: 'branch-details/:id',
        component: BranchDetailsComponent,
      },
      {
        path: 'section-details/:id',
        component: SectionDetailsComponent,
      },
      
    ],
  },
];