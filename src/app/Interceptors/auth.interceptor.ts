
import {tap,  map, catchError } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import {
    HttpInterceptor,
    HttpRequest,
    HttpResponse,
    HttpHandler,
    HttpEvent,
    HttpErrorResponse
} from '@angular/common/http';

import { throwError ,  Observable } from 'rxjs';
import { HelperService } from '../services/helper.service';
import { LoaderService } from '../services/loader.service';
import { ErrorHandlerService } from '../services/error-handler.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(public auth: HelperService,private _loaderService: LoaderService,private _errHandler: ErrorHandlerService) {}
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      this._loaderService.showLoader();
    var token: string = localStorage.getItem('TOKEN');

        if (token) {
            request = request.clone({ 
              headers: request.headers.set(
                'Authorization', 'Bearer '+ token,
              )
          });
        }
        

        if (!request.headers.has('Content-Type')) {
            request = request.clone({ headers: request.headers.set('Content-Type', 'application/json'),url: "http://localhost:3000/" + request.url });
        }

       request = request.clone({ headers: request.headers.set('Accept', 'application/json') });
        return next.handle(request).pipe(tap((event: HttpEvent<any>) => {
            if (event instanceof HttpResponse) {
              // do stuff with response if you want
            }
          }, (err: any) => {
            if (err instanceof HttpErrorResponse) {
              this._loaderService.hideLoader();
              this._errHandler.pushError(err);
            }
          }, () => {
            this._loaderService.hideLoader();
          }));
         
}
}