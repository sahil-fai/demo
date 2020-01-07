import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  enroll(signupdetails): Observable<any> {
    const env = environment;
  // let signupdetails = {
  //   email: data.username,
  //   lastname: data.lastName,
  //   password: data.password,
  //   firstName: data.firstName,
  //   roleType:data.role,
  //   inviteby:data.inviteby,
  //   invitetype:data.invitetype,
  //   invitecompanyid:data.invitecompanyid,
  //   inviteuserid:data.inviteuserid      
  //   };
  
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

  resetPassword(data: any) { 
    return this.http.post<any>('users/update-password', data);
  }

  // will send email over service endpoints and a mail will be send to registered  email of user
  forgotPassword(username): Observable<any> {
    return this.http.post<any>('users/forget-password/' + username, null);
  }

  checkResetPasswordLinkStatus(id: number): Observable<any> { console.log('check password hit: ', id);
    return this.http.get<any>('users/reset-password?requestId=' + id);
  }

  verifyInvite(id: number): Observable<any> {
    return this.http.get<any>('signup?requestId=' + id);
  }
  
}
