
import { Injectable } from '@angular/core';
const TOKEN = 'TOKEN';

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
  set(token: string): void {
    localStorage.setItem(TOKEN, token);
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
  
  constructor() { }
}
