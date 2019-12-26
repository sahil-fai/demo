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
    return this.http.get<any>('/users/' + id + '/list');
  }

  getAllCustomers(id: number): Observable<any> {
    // tslint:disable-next-line: max-line-length
    return this.http.get<any>('business/'+id+'/customers' , {
   });
  }

  getAllVendors(id: number): Observable<any> {
    return this.http.get<any>('business/'+id+'/vendors', {
   });
  }

  getAllInvoices(id: number): Observable<any> {
    // tslint:disable-next-line: max-line-length
    return this.http.get<any>('business/'+id+'/invoices',{
    });
  }

  getAllBills(id: number, filter?:string): Observable<any> {
    return this.http.get<any>('business/bills/' + id );
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

  postInvite(userid:number,compid:number,email:string)
  {
    return this.http.post<any>('/users/'+ userid+'/company/'+compid +'/invite/'+ email, {
    });
  }
 }
