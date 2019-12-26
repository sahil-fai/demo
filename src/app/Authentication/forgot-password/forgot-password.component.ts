import { Component, OnInit } from '@angular/core';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Router } from '@angular/router';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { AuthService } from 'src/app/services/auth-service/auth.service';
import { HelperService } from 'src/app/services/helper-service/helper.service';
import { DomSanitizer } from '@angular/platform-browser';
import { MatDialog, MatSnackBar } from '@angular/material';
import { NotificationsnackbarService } from 'src/app/services/notificationsnackbar.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.less']
})
export class ForgotPasswordComponent implements OnInit {
  formLogin: FormGroup;
  submitted: boolean;
  // tslint:disable-next-line: variable-name
  
  formForgot: any;
  isMailSent: boolean;

 // tslint:disable-next-line: max-line-length
  constructor(private router: Router, private _fb: FormBuilder, private authService: AuthService, private helper: HelperService, private sanitizer: DomSanitizer, public dialog: MatDialog, private notification: NotificationsnackbarService, private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.createForm();
  }
  
  private createForm() {
    this.formLogin = this._fb.group({
      username: ['', [ Validators.required, Validators.email ]]
    });
  }

  get f() {
    return this.formLogin.controls;
  }
  public onLogin() {
      this.router.navigate(['/login']);
  }

  public onForgot() {
    this.submitted = true;
    console.log('hi...', this.formLogin.value);
    if (this.formLogin.valid) {
     this.authService.forgotPassword(this.formLogin.value["username"]).subscribe((res)=>{
      this.isMailSent = true; 
     });
      
    }
    // if (this.formLogin.invalid) { return; }
    // this._authService.forgotPassword(this.formLogin.value);
    // this.isMailSent = true;
    }
  }

