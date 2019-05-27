import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../../services/auth.service';
import { HelperService } from '../../services/helper.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.less']
})
export class LogoutComponent implements OnInit {


  constructor(private _authService: AuthService, private helper: HelperService, private _router: Router) { }

  ngOnInit() {
  }
  public onLogout() {
      this.helper.clearToken();
      this._router.navigate([""]);
  }
};
