import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { HelperService } from '../../services/helper-service/helper.service';

@Injectable({
  providedIn: 'root'
})
export class BusinessService {

  constructor(private http: HttpClient, private helper:HelperService) { }

  getListOfbusinesses(id: number): Observable<any> {
    return this.http.get<any>('/users/' + id + '/list?offset='+0);
  }

  getAllCustomers(id: number, filter?: string): Observable<any> {
    // tslint:disable-next-line: max-line-length
    return this.http.get<any>('business/'+id+'/customers?offset='+0+'&displayname='+filter, {
   });
  }

  searchCustomer(searchTerm: string, id: number): Observable<any> {
    // tslint:disable-next-line: max-line-length
    return this.http.get<any>('customersbyname?displayname='+searchTerm+'&companyId='+id, {
   });
  }

  getAllVendors(id: number, filter?: string): Observable<any> {
    return this.http.get<any>('business/'+id+'/vendors?offset='+0+'&displayname='+filter, {
   });
  }

  getAllInvoices(id: number, filter?: string): Observable<any> {
    // tslint:disable-next-line: max-line-length
    return this.http.get<any>('business/'+id+'/invoices?offset='+0+'&customername='+filter,{
    });
  }

  getAllBills(id: number, filter?:string): Observable<any> {
    return this.http.get<any>('business/' + id +'/invoicebills?offset='+0+'&vendorname='+filter );
  }

  getPlatforms(): Observable<any> {
    return this.http.get<any>('/platforms', {
   });
  }

  getCompanyInformation(id: number, filter?:string): Observable<any> {
    return this.http.get<any>('business/' + id);
  }

  getCompanyChartOfAccounts(id: number, filter?:string): Observable<any> {
    // tslint:disable-next-line: max-line-length
    return this.http.get<any>('business/'+id +'/chartofaccounts' + '?type=expense', {
    });
  }

  postchartofaccountmapping(data)
  {
      return this.http.post<any>('/chartofaccountmappings', data);
  }

  getchartofaccountmapping(id): Observable<any> {
    // tslint:disable-next-line: max-line-length
    return this.http.get<any>('business/' +id +'/chartofaccountmappings', {
    });
  }

  getGroupChartofAccounts(id: any) {
        return this.http.get<any>('business/'+id +'/groupchartofaccount', {
    });
  }

  setAsDefault(id:number) {
      return this.http.post<any>('coa/setasdefault/'+ id, null);
  }

  postInvite(data)
  {
    return this.http.post<any>('/users/invite', data);
  }

  getInvoicePDF(id: number, invoiceId: string, platformId: number): Observable<any> {
   // return this.http.get('business/240/invoice/a1a64ff4-76a4-48d0-a2f8-5b5ce8a81f74/platform/126', { responseType: 'blob' })
    return this.http.get('business/'+id+'/invoice/'+invoiceId+'/platform/'+platformId, { responseType: 'blob' })
  }

  connetDisconnect(id, status){
      return this.http.post<any>('business/'+id +'/connetDisconnect/'+status, {
      });
  }
}
