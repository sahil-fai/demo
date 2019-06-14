import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './Authentication/login/login.component';
import { SignupComponent } from  './Authentication/signup/signup.component';
import { DashboardComponent } from './Dashboard/dashboard/dashboard.component';
import { AuthGuard } from './Guards/auth.guard';
import { SingleLedgerBusinessListComponent } from './Dashboard/single-ledger-business-list/single-ledger-business-list.component';
import { SingleLedgerMasterComponentComponent } from './Components/SingleLedgerComponents/single-ledger-master-component/single-ledger-master-component.component';
import { BillsComponentComponent } from './Components/SingleLedgerComponents/bills-component/bills-component.component';
import { VendorsComponentComponent } from './Components/SingleLedgerComponents/vendors-component/vendors-component.component';
import { CustomersComponentComponent } from './Components/SingleLedgerComponents/customers-component/customers-component.component';
import { InvoicesComponentComponent } from './Components/SingleLedgerComponents/invoices-component/invoices-component.component';
import { CompanyInfoComponentComponent } from './Components/SingleLedgerComponents/company-info-component/company-info-component.component';
import { DashboardComponetComponent } from './Components/SingleLedgerComponents/dashboard-componet/dashboard-componet.component'
const routes: Routes = [
  {
    path: 'login', component: LoginComponent
  },
  {
    path: 'signup', component: SignupComponent
  },
  {
   // path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard]
    path: 'connectbusiness', component: DashboardComponent
  },
  {
    path: 'businesslist', component: SingleLedgerBusinessListComponent
  },
  { 
    path: 'business', component: SingleLedgerMasterComponentComponent, children: [
          {
            path: 'dashboard', component: DashboardComponetComponent
          },
          {
            path: 'customers', component: CustomersComponentComponent
          },
          {
            path: 'vendors', component: VendorsComponentComponent
          },
          {
            path: 'invoices', component: InvoicesComponentComponent
          },
          {
            path: 'bills', component: BillsComponentComponent
          },
          {
            path: 'company-info', component: CompanyInfoComponentComponent
          }
        ]
  },
  {
    path: '**', redirectTo: 'login'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { 
 
}