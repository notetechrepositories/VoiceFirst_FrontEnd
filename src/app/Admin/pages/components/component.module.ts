import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TestComponent } from './test/test.component';
import { ComponentRoutes } from './component.routing.module';
import { IndexpageComponent } from './indexpage/indexpage.component';
import { CountryComponent } from './country/country.component';




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
    CountryComponent
  ],
})
export class ComponentModule {}