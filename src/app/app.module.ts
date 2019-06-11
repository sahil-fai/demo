import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDatepickerModule, MatNativeDateModule, MatPaginatorModule, MatSlideToggleModule, MatProgressBarModule, MatCheckboxModule, MatRadioModule, MatDialogModule, MatListModule } from '@angular/material';
import {MatCardModule} from '@angular/material/card';
import {MatTableModule} from '@angular/material/table';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule  } from '@angular/forms';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatSelectModule} from '@angular/material/select';
import { ToastrModule } from 'ngx-toastr';
import { AuthService } from './services/auth.service';
import { LoaderService } from './services/loader.service';

//ngx-pagination
import {NgxPaginationModule} from 'ngx-pagination';
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
import { DialogOverviewExampleDialogComponent } from './Shared/dialog-overview-example-dialog/dialog-overview-example-dialog.component';
import { SingleLedgerBusinessListComponent } from './Dashboard/single-ledger-business-list/single-ledger-business-list.component';
import { AddbusinessComponent } from './Shared/addbusiness/addbusiness.component';
import { DashboardComponetComponent } from './Components/SingleLedgerComponents/dashboard-componet/dashboard-componet.component';
import { CustomersComponentComponent } from './Components/SingleLedgerComponents/customers-component/customers-component.component';
import { VendorsComponentComponent } from './Components/SingleLedgerComponents/vendors-component/vendors-component.component';
import { InvoicesComponentComponent } from './Components/SingleLedgerComponents/invoices-component/invoices-component.component';
import { BillsComponentComponent } from './Components/SingleLedgerComponents/bills-component/bills-component.component';
import { CompanyInfoComponentComponent } from './Components/SingleLedgerComponents/company-info-component/company-info-component.component';
import { SingleLedgerMasterComponentComponent } from './Components/SingleLedgerComponents/single-ledger-master-component/single-ledger-master-component.component';
import { StylePaginatorDirective } from './Directives/style-paginator.directive';

//unnecessery
import {MatIconModule} from '@angular/material/icon'

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
    ErrorHandlerComponent,
    DialogOverviewExampleDialogComponent,
    SingleLedgerBusinessListComponent,
    AddbusinessComponent,
    DashboardComponetComponent,
    CustomersComponentComponent,
    VendorsComponentComponent,
    InvoicesComponentComponent,
    BillsComponentComponent,
    CompanyInfoComponentComponent,
    SingleLedgerMasterComponentComponent,
    StylePaginatorDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatTableModule,
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
    MatExpansionModule,
    MatSelectModule,
    ToastrModule.forRoot({
      timeOut: 3000,
      positionClass: 'toast-top-center',
      preventDuplicates: true,
      extendedTimeOut : 0,
      closeButton: true,
      tapToDismiss: false
    }),
    NgxPaginationModule,
    MatIconModule
  ],
  providers: [AuthService, LoaderService,{ provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true }],
  bootstrap: [AppComponent],
  entryComponents: [DialogOverviewExampleDialogComponent]
})
export class AppModule { }
