import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { HelperService } from '../services/helper-service/helper.service';

@Injectable({
  providedIn: 'root'
})
export class TaxMappingGuard implements CanActivate {
  constructor(private _router: Router, private _helper: HelperService){ }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    var isTaxMapped = JSON.parse(this._helper.getTaxMapping());
    if(isTaxMapped){
       return true;
      } else{
        this._router.navigate(['/business/tax-mapping'])
        return false;
      }      
    }
  }