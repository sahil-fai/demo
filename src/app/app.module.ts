import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MatDatepickerModule, MatNativeDateModule, MatPaginatorModule, MatSlideToggleModule, MatProgressBarModule, MatCheckboxModule, MatRadioModule, MatDialogModule, MatListModule } from '@angular/material';
import {MatCardModule} from '@angular/material/card';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule  } from '@angular/forms';
import { AuthService } from './services/auth.service'

// Interceptors
import { TokenInterceptor } from './Interceptors/auth.interceptor';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './Authentication/login/login.component';
import { SignupComponent } from './Authentication/signup/signup.component';
import { LogoComponent } from './Dashboard/logo/logo.component';
import { LogoutComponent } from './Dashboard/logout/logout.component';
import { UserinfoComponent } from './Dashboard/userinfo/userinfo.component';
import { AccountingComponent } from './Dashboard/accounting/accounting.component';
import { DashboardComponent } from './Dashboard/dashboard/dashboard.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    LogoComponent,
    LogoutComponent,
    UserinfoComponent,
    AccountingComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatCardModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatSlideToggleModule,
    MatCheckboxModule,
    MatRadioModule,
    MatDialogModule,
  ],
  providers: [AuthService, { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true }],

  bootstrap: [AppComponent]
})
export class AppModule { }
