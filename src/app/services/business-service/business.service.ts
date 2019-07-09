import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BusinessService {

  constructor(private http: HttpClient) { }

  getListOfbusinesses(id:number): Observable<any> {
    return this.http.get<any>('business/list?userId='+id);
  }

  getAllCustomers(): Observable<any> {
    return this.http.get<any>('business/customers', {
   });
  }

  getAllVendors(): Observable<any> {
    return this.http.get<any>('business/vendors', {
   });
  }

  getAllInvoices(): Observable<any> {
    return this.http.get<any>('business/invoices', {
   });
  }

  getAllBills(): Observable<any> {
    return this.http.get<any>('business/bills', {
   });
  }

  getCompanyInformation(): Observable<any> {
    return this.http.get<any>('business'+ '?id=111');
  }
}
