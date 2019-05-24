
import { Injectable } from '@angular/core';
const TOKEN = 'TOKEN';

@Injectable({
  providedIn: 'root'
})
export class HelperService {

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
