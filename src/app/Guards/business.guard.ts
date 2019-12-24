import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router, CanActivateChild } from '@angular/router';
import { Observable } from 'rxjs';
import { HelperService } from '../services/helper-service/helper.service';

@Injectable({
  providedIn: 'root'
})
export class BusinessGuard implements CanActivate {
  constructor(private _router: Router, private _helper: HelperService){ }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

      var company = this._helper.getcompanyId();
      if(company){
       return true;
      } else{
        this._router.navigate(['/businesslist'])
        return false;
      }    
    return false;
  }
  
}
