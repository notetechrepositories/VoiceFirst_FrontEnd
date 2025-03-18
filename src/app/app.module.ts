import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BlankComponent } from './Admin/layout/blank/blank.component';
import { FullComponent } from './Admin/layout/full/full.component';
import { RouterOutlet } from '@angular/router';
import { AuthService } from './Services/authService/auth.service';
import { HttpClientModule } from '@angular/common/http';
import { SubscriptionComponent } from './Admin/layout/subscription/subscription.component';
import { FilterPipe } from './filter.pipe';
import { NavbarComponent } from './User/navbar/navbar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NotfoundComponent } from './User/notfound/notfound.component';

export function appInitializer(authService: AuthService): () => Promise<void> {
  return () =>
    new Promise((resolve) => {
      authService.validateToken().then(() => resolve());
    });
}

@NgModule({
  declarations: [
    AppComponent,
    BlankComponent,
    FullComponent,
    SubscriptionComponent,
    NotfoundComponent,
    FilterPipe,
    NavbarComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    RouterOutlet,
    HttpClientModule,
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: appInitializer,
      deps: [AuthService],
      multi: true,
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
