import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDatepickerModule, MatNativeDateModule, MatPaginatorModule, MatSlideToggleModule, MatProgressBarModule, MatCheckboxModule, MatRadioModule, MatDialogModule, MatListModule } from '@angular/material';
import {MatCardModule} from '@angular/material/card';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule  } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { AuthService } from './services/auth.service'
import { LoaderService } from './services/loader.service'

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
import { LoaderComponent } from './Shared/loader/loader.component';
import { ErrorHandlerComponent } from './Shared/ErrorHandler/error-handler/error-handler.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    LogoComponent,
    LogoutComponent,
    UserinfoComponent,
    AccountingComponent,
    DashboardComponent,
    LoaderComponent,
    ErrorHandlerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
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
    ToastrModule.forRoot({
      timeOut: 3000,
      positionClass: 'toast-top-center',
      preventDuplicates: true,
      extendedTimeOut : 0,
      closeButton: true,
      tapToDismiss: false
    }),
  ],
  providers: [AuthService, LoaderService,{ provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true }],

  bootstrap: [AppComponent]
})
export class AppModule { }
