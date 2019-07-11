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

  getAllCustomers(id:number): Observable<any> {
    return this.http.get<any>('customers'+ '?filter={"where":{"referencecompanyid":'+ id +'},"limit":10,"include":[{"relation":"company"}]}', {
   });
  }

  getAllVendors(id:number): Observable<any> {
    console.log(id)
    return this.http.get<any>('vendors'+ '?filter={"where":{"referencecompanyid":'+ id +'},"limit":10,"include":[{"relation":"company"}]}', {
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

  getCompanyInformation(id:number): Observable<any> {
    return this.http.get<any>('business?id='+id);
  }
}
