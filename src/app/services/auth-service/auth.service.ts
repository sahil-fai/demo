import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  resetPassword(data: any) {
    return this.http.post<any>('users/update-password', {
      requestId: data.requestid,
      password: data.password,
    });
  }
  constructor(private http: HttpClient) {
  }

  enroll(data): Observable<any> {
    const env = environment;

  let signupdetails = {
    email: data.username,
    lastname: data.lastName,
    password: data.password,
    firstName: data.firstName,
    roleType:data.role,
    inviteby:data.inviteby,
    invitetype:data.invitetype,
    invitecompanyid:data.invitecompanyid,
    inviteuserid:data.inviteuserid      
    };
  
    if (signupdetails.invitecompanyid == null || signupdetails.invitecompanyid == undefined)
    {
      delete signupdetails.invitecompanyid;
      delete signupdetails.invitetype;
      delete signupdetails.inviteuserid;
      delete signupdetails.inviteby;
    }

    return this.http.post<any>('users', signupdetails);
  }

  login(data): Observable<any> {
    const env = environment;
    return this.http.post<any>('users/login', {
      email: data.username,
      password: data.password,
    });
  }

  //2019-12-26 13:18:19 method added for forget password  functioanlity , 
  // will send email over service endpoints and a mail will be send to registered  email of user
  forgotPassword(username): Observable<any> {
    return this.http.post<any>('users/forget-password/' + username, null);
  }
  
}
