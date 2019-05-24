import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { HelperService } from '../../services/helper.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less']
})
export class LoginComponent implements OnInit {

  private _subscribeFormControls: any;
  public submitted = false;

  constructor(private router: Router, private _fb: FormBuilder,private authService:AuthService, private helper: HelperService) { }

  formLogin: FormGroup;

  ngOnInit() {
    this.createForm();
    this._subscribeFormControls = this.formLogin.controls['username'].valueChanges.subscribe(val => {
      if (val.indexOf(' ') >= 0) {
        this.formLogin.controls['username'].setValue(this._helper.removeEmptySpaces(val));
      }
    });
  }
  private createForm() {
    this.formLogin = this._fb.group({
      username: ['', [ Validators.required, Validators.email ]],
      password: ['', [ Validators.required, Validators.minLength(6) ]]
    });
  }
  public onLogin() {
    this.submitted = true;
    if (this.formLogin.invalid) {return; }
    this.authService.login(this.formLogin.value).subscribe(res => {
        this.helper.set(res.token);
        this.router.navigate(['/dashboard']);
        if (res['Role'] === 0) {
          this.router.navigate(['/dashboard']);
        }
    },
    err =>  {
      this.formLogin.patchValue({password: ''});
    }
    );
  }
  get f() { return this.formLogin.controls; 
  }

}

