import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BusinessService {

  constructor(private http: HttpClient) { }

  getListOfbusinesses(id: number): Observable<any> {
    return this.http.get<any>('usercompanies' + '?filter={"where":{"userid":' + id + '},"limit":10,"include":[{"relation":"all"}]}');
  }

  getAllCustomers(id: number): Observable<any> {
    // tslint:disable-next-line: max-line-length
    return this.http.get<any>('customers' + '?filter={"where":{"referencecompanyid":' + id + '},"limit":10,"include":[{"relation":"company"}]}', {
   });
  }

  getAllVendors(id: number): Observable<any> {
    console.log(id);
    // tslint:disable-next-line: max-line-length
    return this.http.get<any>('vendors' + '?filter={"where":{"referencecompanyid":' + id + '},"limit":10,"include":[{"relation":"company"}]}', {
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

  getCompanyInformation(id: number): Observable<any> {
    return this.http.get<any>('companies/' + id + '?filter={"include":[{"relation":"all"}]}');
  }
}
