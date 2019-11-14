import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient) {
  }

  enroll(data): Observable<any> {
    const env = environment;
    return this.http.post<any>('users', {
      email: data.username,
      lastname: data.lastName,
      password: data.password,
      firstName: data.firstName,
      roleType:data.role
      
      });
  }

  login(data): Observable<any> {
    const env = environment;
    return this.http.post<any>('users/login', {
      email: data.username,
      password: data.password,
    });
  }
}
