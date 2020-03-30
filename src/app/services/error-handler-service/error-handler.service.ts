import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService {

  constructor(){ }
  // Observable string sources
  private errorSource = new Subject<any>();
  // Observable string streams
  public isCaughtError = this.errorSource.asObservable();
  // Service message commands
  public pushError(err:any) {
     this.errorSource.next(err);
    }
  }
