import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class QuickBookConnectService {
  private _qbPath = 'quickbooks/';
  constructor(public http:HttpClient) { }
  public connect(): Observable<object[]> {
    return this.http.get<object[]>(this._qbPath + 'connect');
  }
}
