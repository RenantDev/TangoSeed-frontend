import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {RouterModule} from '@angular/router';
import {LocationStrategy, HashLocationStrategy} from '@angular/common';

import {ROUTES} from './app.routes';
import {AppComponent} from './app.component';

// App views
import {DashboardsModule} from './views/dashboards/dashboards.module';
import {AppviewsModule} from './views/appviews/appviews.module';

// App modules/components
import {LayoutsModule} from './components/common/layouts/layouts.module';
import {ProfileComponent} from './views/profile/profile.component';
import {HomeComponent} from './views/home/home.component';
import {LoginComponent} from './views/login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    ProfileComponent,
    HomeComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    DashboardsModule,
    LayoutsModule,
    AppviewsModule,
    RouterModule.forRoot(ROUTES),
  ],
  providers: [{provide: LocationStrategy, useClass: HashLocationStrategy}],
  bootstrap: [AppComponent]
})
export class AppModule {
}
