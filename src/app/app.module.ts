import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BlankComponent } from './Admin/layout/blank/blank.component';
import { FullComponent } from './Admin/layout/full/full.component';
import { RouterOutlet } from '@angular/router';
import { AuthService } from './Services/authService/auth.service';

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
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterOutlet,
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
