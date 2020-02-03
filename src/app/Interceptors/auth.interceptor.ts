import { tap, catchError } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpInterceptor, HttpRequest, HttpResponse, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { HelperService } from '../services/helper-service/helper.service';
import { LoaderService } from '../services/loader-service/loader.service';
import { ErrorHandlerService } from '../services/error-handler-service/error-handler.service';
import { Router } from '@angular/router';


@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(public auth: HelperService, private _loaderService: LoaderService, private _router: Router, private _errHandler: ErrorHandlerService) {

  }

  private requests: HttpRequest<any>[] = [];

  removeRequest(req: HttpRequest<any>) {
    const i = this.requests.indexOf(req);
    if (i >= 0) {
      this.requests.splice(i, 1);
    }
    this._loaderService.isLoading.next(this.requests.length > 0);
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this._loaderService.isLoading.next(true);
    const token: string = localStorage.getItem('TOKEN');
    if (token) {
      request = request.clone({
        headers: request.headers.set(
          'Authorization', 'Bearer ' + token,
        )
      });
    }
    if (!request.headers.has('Content-Type')) {
      request = request.clone({
        headers: request.headers.set('Content-Type', 'application/json'),
        url: environment.host + request.url
      });
    }
    request = request.clone({
      headers: request.headers.set('Accept', 'application/json')
    });

    return next.handle(request).pipe(tap((event: HttpEvent<any>) => {
      if (event instanceof HttpResponse) {
      }
      if (event.type === 4) {
        this.removeRequest(request);
      }
      return event;
    }),
      catchError((err: HttpErrorResponse) => {
        this._loaderService.isLoading.next(false);
        if (err instanceof HttpErrorResponse) {
          this.removeRequest(request);
          localStorage.clear();
          if (err.statusText === 'Unknown Error' || err.status == 401) {
            console.log('brij11111 : ', err);
            if (err.statusText === 'Unknown Error') {
              console.log('brij4444444 : ', err);
              this._errHandler.pushError(err.statusText);
            }
            if (err.status == 401) {
              console.log('brij 5555: ', err);
              this._router.navigate(['./login']);
            }
          } else {
            if (err.error && err.error.error && err.error.error.message) {
              console.log('brij222 : ', err);
              this._errHandler.pushError(err.error.error.message);
            } else {
              console.log('brij333333 : ', err);
              this._errHandler.pushError(err.message);
            }
          }
          return throwError(err);
        }
      }));
  }
}
