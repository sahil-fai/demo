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
    let env = environment;
    return this.http.post<any>('http://localhost:3000/users', {
      "email": data.username,
      "lastname": data.lastName,
      "password": data.password,
      "firstName": data.firstName,
      "IsActive": true,
      "RoleTypeId": 0,
      "LastLogin": "2019-05-24T10:12:01.708Z",
      "RegisterDate": "2019-05-24T10:12:01.708Z"
    });
  }

  login(data): Observable<any> {
    let env = environment;
    return this.http.post<any>('http://localhost:3000/users/login', {
      "email": data.username,
      "password": data.password,
    });
  }


}