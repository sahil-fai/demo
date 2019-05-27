// This interceptor used to intercept all request and add access token to request header.

import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/do';
import { tap } from 'rxjs/operators';
//import { tap } from 'rxjs/operators';

import { HelperService } from '../services/helper.service';
//import { LoaderService } from '../services/shared/loader-service/loader.service';
//import { ErrorHandlerService } from '../services/shared/error-handler-service/error-handler.service';
//import { ToastrService } from 'ngx-toastr';
//import { Messages } from '../enums/messages.enum';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(private _helper: HelperService){}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable< HttpResponse<any>> {
    
    // Clear the all toast messages before place new request && show loader as well
    var self = this;
    // this._toastr.toasts.forEach(function(toast){
    //   if(toast['message'] != Messages.qbDisconnected && toast['message'] != Messages.businessReloadedSuccessfully &&  toast['message'] != Messages.businessDataReload){
    //     self._toastr.clear(toast['toastID']);
    //   }
    // });
    // this._loaderService.showLoader();

    //Clone request here
    request = request.clone({
      setHeaders: this._setHeaders(),
      url: environment.host + request.url
    });

      return next.handle(request).pipe(tap(
      
        (err: any) => {
          if (err instanceof HttpErrorResponse) {
            console.log(err);
            if (err.status === 401) {

            }
          }
          else{
            if (event instanceof HttpResponse) {
              var buss_token = event.headers.get('Business');
              if(buss_token){
                localStorage.setItem('business_token', buss_token);
              }
            }
          }
        },


      ));

    // return next.handle(request).do((event: HttpEvent<any>) => {
    //   if (event instanceof HttpResponse) {
    //     var buss_token = event.headers.get('Business');
    //     if(buss_token){
    //       localStorage.setItem('business_token', buss_token);
    //     }
    //   }
    // }, (err: any) => {
    //   if (err instanceof HttpErrorResponse) {
    //    // this._loaderService.hideLoader();
    //  //   this._errHandler.pushError(err);
    //   }
    // }, () => {
    //   //this._loaderService.hideLoader();
    // });
  }

  private _token(): string{
    if(this._helper.session.get()){
      if(this._helper.session.get()['Token']){
        return 'Bearer ' + this._helper.session.get()['Token'];
      }
      else{
        return '';
      }
    }
    return '';
  }

  private _businessToken(): string{
    var business_token = localStorage.getItem('business_token');
    if(business_token){
      return business_token;
    }else{
      return '';
    }    
  }

  private _setHeaders(): any{
    var business_token = localStorage.getItem('business_token');
    var session = this._helper.session.get();
    if(session){
      session = session['Token'];
    }
    if(session){
      if(business_token){
        return {
          Authorization: 'Bearer ' + session,
          Localdate: new Date().toDateString(),
          Business: business_token
        }   
      }else{
        return {
          Authorization: 'Bearer ' + session,
          Localdate: new Date().toDateString()
        }
      }
    }else{
      return {
        Localdate: new Date().toDateString()
      }
    }
  }

}
