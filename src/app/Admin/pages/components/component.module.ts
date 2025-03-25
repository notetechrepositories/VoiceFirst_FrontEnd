import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TestComponent } from './test/test.component';
import { ComponentRoutes } from './component.routing.module';
import { IndexpageComponent } from './indexpage/indexpage.component';
import { AddpopupComponent } from './indexpage/addpopup/addpopup.component';
import { CountryComponent } from './country/country.component';
import { CreateCountryComponent } from './country/create-country/create-country.component';
import { EditCountryComponent } from './country/edit-country/edit-country.component';
import { Division1Component } from './country/division1/division1.component';
import { HttpClient } from '@angular/common/http';
import { AddRoleComponent } from './role/add-role/add-role.component';
import { RoleComponent } from './role/role.component';
import { Division2Component } from './country/division2/division2.component';
import { Division3Component } from './country/division3/division3.component';
import { filter } from 'rxjs';
import { FilterPipe } from '../../../filter.pipe';
import { SelectionComponent } from './constant/selection/selection.component';
import { SelectionValuesComponent } from './constant/selection-values/selection-values.component';
import { EditRoleComponent } from './role/edit-role/edit-role.component';
import { CompanyComponent } from './company/company.component';
import { CompanyAddComponent } from './company/company-add/company-add.component';
import { ProfileComponent } from './profile/profile.component';
import { BranchComponent } from './branch/branch.component';
import { AddBranchComponent } from './branch/add-brach/add-branch/add-branch.component';
import { EditBranchComponent } from './branch/edit-branch/edit-branch.component';
import { CompanyViewComponent } from './company/company-view/company-view.component';
import { EmployeeComponent } from './employee/employee.component';
import { EmployeeAddComponent } from './employee/employee-add/employee-add.component';
import { EmployeeViewComponent } from './employee/employee-view/employee-view.component';
import { CompanyRoleComponent } from './company-role/company-role.component';
import { SystemRoleComponent } from './system-role/system-role.component';
import { AddSystemRoleComponent } from './system-role/add-system-role/add-system-role.component';
import { EditSystemRoleComponent } from './system-role/edit-system-role/edit-system-role/edit-system-role.component';
import { AddTypeComponent } from './system-types/add-type/add-type.component';
import { EditTypeComponent } from './system-types/edit-type/edit-type.component';
import { SystemTypesComponent } from './system-types/system-types.component';






@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(ComponentRoutes),
    FormsModule,
    ReactiveFormsModule
    
  ],
  declarations: [
    TestComponent,
    IndexpageComponent,
    AddpopupComponent,
    CountryComponent,
    CreateCountryComponent,
    EditCountryComponent,
    Division1Component,
    RoleComponent,
    AddRoleComponent,
    Division2Component,
    Division3Component,
    SelectionComponent,
    SelectionValuesComponent,
    EditRoleComponent,
    CompanyComponent,
    CompanyAddComponent,
    ProfileComponent,
    BranchComponent,
    AddBranchComponent,
    EditBranchComponent,
    CompanyViewComponent,
    EmployeeComponent,
    EmployeeAddComponent,
    EmployeeViewComponent,
    CompanyRoleComponent,
    SystemRoleComponent,
    AddSystemRoleComponent,
    EditSystemRoleComponent
    SystemTypesComponent,
    AddTypeComponent,
    EditTypeComponent,
  ],
})
export class ComponentModule {}