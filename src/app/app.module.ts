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

import {AuthService} from "./services/login/auth.service";

import {LoginModule} from "./views/login/login.module";
import {AuthGuard} from "./guards/auth.guard";
import {AdminModule} from "./views/admin/admin.module";

import {ConfigGlobal} from "./services/config-global";
import {VarGlobal} from "./services/var-global";
import { TableModule } from './components/common/table/table.module';

@NgModule({
  declarations: [
    AppComponent,
    ProfileComponent,
  ],
  imports: [
    TableModule,
    AdminModule,
    LoginModule,
    BrowserModule,
    FormsModule,
    HttpClientModule,
    DashboardsModule,
    LayoutsModule,
    AppviewsModule,
    RouterModule.forRoot(ROUTES),
  ],
  providers: [ConfigGlobal, VarGlobal, AuthService, AuthGuard, {provide: LocationStrategy, useClass: HashLocationStrategy}],
  bootstrap: [AppComponent]
})
export class AppModule {
}
