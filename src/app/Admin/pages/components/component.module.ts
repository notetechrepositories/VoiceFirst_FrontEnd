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




@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(ComponentRoutes),
    FormsModule,
    ReactiveFormsModule,
  ],
  declarations: [
    TestComponent,
    IndexpageComponent,
    AddpopupComponent,
    CountryComponent,
    CreateCountryComponent,
    EditCountryComponent,
    Division1Component
  ],
})
export class ComponentModule {}