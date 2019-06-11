import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HelperService } from '../helper-service/helper.service';

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService {

  constructor(private _helperService:HelperService){

  }
  // Observable string sources
  private errorSource = new Subject<any>();

  // Observable string streams
  public isCaughtError = this.errorSource.asObservable();

  // Service message commands
  public pushError(err:any) {
     this.errorSource.next(err);
    }
  }
