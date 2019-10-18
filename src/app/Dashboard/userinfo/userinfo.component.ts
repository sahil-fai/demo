import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HelperService } from 'src/app/services/helper-service/helper.service';

@Component({
  selector: 'app-userinfo',
  templateUrl: './userinfo.component.html',
  styleUrls: ['./userinfo.component.less']
})
export class UserinfoComponent implements OnInit {
  userinfo: any;

  constructor(private helper: HelperService, private _router: Router) { }

  ngOnInit() {
    this.userinfo = this.helper.userInfo.get();

  }
  public onLogout() {
    this.helper.clearToken();
    this._router.navigate(['/login']);
}
}
