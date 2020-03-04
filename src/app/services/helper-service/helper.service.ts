
import { Injectable } from '@angular/core';
const TOKEN = 'TOKEN';
interface userInfo {id:number,email:string,lastname:string};
@Injectable({
  providedIn: 'root'
})
export class HelperService {
   // Session related methods
   public session = {
    'get': function() {return JSON.parse(localStorage.getItem('session'));},
    'set': function(session) {localStorage.setItem('session', JSON.stringify(session)); },
    'remove': function() {localStorage.removeItem('session'); }
  };
   public userInfo = {
    'get': function() {return JSON.parse(localStorage.getItem('userInfo'));},
    'set': function(userinfo) {localStorage.setItem('userInfo', JSON.stringify(userinfo)); },
    'remove': function() {localStorage.removeItem('userInfo'); }
  };
  set(token: string): void {
    localStorage.setItem(TOKEN, token);
  }
  setcompanyId(id:any):void {
    localStorage.setItem('CompanyId', id);
  }

  setplatformId(id:any):void {
    localStorage.setItem('PlatformId', id);
  }


  getcompanyId(){
    let companyid =  localStorage.getItem('CompanyId');
    if (companyid && companyid.length > 0)
    {
        return companyid;
    }
    
  }
  getplatformId(){
    let platformid =  localStorage.getItem('PlatformId');
    return Number(platformid);
  }


  getuserId(){
    let userinfo:userInfo = JSON.parse(localStorage.getItem('userInfo'));
    return userinfo.id;
  }

  getToken(){
   return localStorage.getItem("TOKEN");
  }

  clearToken(): void {
    localStorage.setItem(TOKEN, null);
    localStorage.clear();
  }

  isLogged() {
    return localStorage.getItem(TOKEN) != null;
  }

  getTaxMapping(){
    return localStorage.getItem("isTaxMapped");
   }

   setTaxMapping(val:any):void {
    localStorage.setItem('isTaxMapped', val);
  }

  convertJsonKeysToLower(obj:any)
  {
    var json = JSON.stringify(obj);
    var newJson = json.replace(/"([\w]+)":/g, function($0, $1) {
  return ('"' + $1.toLowerCase() + '":');
});
return JSON.parse(newJson);
  }
  constructor() { }
}
