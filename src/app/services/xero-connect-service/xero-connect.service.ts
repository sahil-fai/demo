import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class XeroConnectService {

  private _qbPath = 'xero/';
  constructor(public http:HttpClient) { }
  public connect(): Observable<object[]> {
    return this.http.get<object[]>(this._qbPath + 'connect');
  }
}
