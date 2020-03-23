import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, Validators, AbstractControl, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth-service/auth.service';
import { MatDialog, MatSnackBar } from '@angular/material';
import { NotificationsnackbarService } from 'src/app/services/notificationsnackbar.service';
import { HelperService } from 'src/app/services/helper-service/helper.service';
import { DomSanitizer } from '@angular/platform-browser';
import Message from  '../../Shared/constant';
import { DialogOverviewExampleDialogComponent } from 'src/app/Shared/dialog-overview-example-dialog/dialog-overview-example-dialog.component';
import { LoaderService } from 'src/app/services/loader-service/loader.service';
//import { constants } from 'os';
@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.less']
})
export class ResetForgetPasswordComponent implements OnInit {

  @Input('role') public role: number;
  public messages = Message;
  public submitted = false;
  private _resetCode: string;
  formReset: FormGroup;
  message: any;
  public showPassword: boolean = false;
  public showConfirmPassword = false;
  _authService: any;
  _router: any;
  safeSrc: any;
  public showUpdatePasswordMassage = true;
  checkResetPasswordStatus: any;
  showInvalidPage: boolean = true;

  constructor(private router: Router, private loaderService: LoaderService, private route: ActivatedRoute, private _fb: FormBuilder, private authService: AuthService, private helper: HelperService, private sanitizer: DomSanitizer, public dialog: MatDialog, private notification: NotificationsnackbarService, private snackBar: MatSnackBar) { }

  ngOnInit() {
  //  this.loaderService.showLoader();
    this.showInvalidPage = false;
    this._resetCode = this.route.snapshot.queryParams.requestId;
    if (this._resetCode) {
      this.authService.checkResetPasswordLinkStatus(Number(this._resetCode)).subscribe(res => {
     //   this.loaderService.hideLoader();
        if (!res.status) {
          this.checkResetPasswordStatus = res;
          this.showInvalidPage = false;
        }
        else {
          this.showInvalidPage = true;
        }
      }, err => {
      //  this.loaderService.hideLoader();
      });
    }
    this.createForm();
  }
  private createForm() {
    this.formReset = this._fb.group({
      password: ['', [Validators.required, Validators.minLength(6), this.hasNumber, this.hasUppercase, this.hasLowercase, this.hasSpecialCharacter]],
      confirmpassword: ['', [Validators.required, Validators.minLength(6), this.hasNumber, this.hasUppercase, this.hasLowercase, this.hasSpecialCharacter]]
    },
      {
        validator: this.checkPasswords
      });
  }
  public checkPasswords(group: FormGroup) {
    if (group.controls) {
      let pass = group.controls.password.value;
      let confirmPass = group.controls.confirmpassword.value;
      return pass === confirmPass ? null : {
        notSame: true
      };
    }
  }
  //check for Numbers
  private hasNumber(control: AbstractControl): { [key: string]: boolean } | null {
    if (control.value && !(/\d/.test(control.value))) {
      return { number: true };
    }
    return null;
  }

  //check for Upper Case letters
  private hasUppercase(control: AbstractControl): { [key: string]: boolean } | null {
    if (control.value && !(/[A-Z]/.test(control.value))) {
      return { uppercase: true };
    }
    return null;
  }

  //check for Lower Case letters
  private hasLowercase(control: AbstractControl): { [key: string]: boolean } | null {
    if (control.value && !(/[a-z]/.test(control.value))) {
      return { lowercase: true };
    }
    return null;
  }

  //check for Special Characters
  private hasSpecialCharacter(control: AbstractControl): { [key: string]: boolean } | null {
    if (control.value && !(/[ !@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(control.value))) {
      return { specialcharacter: true };
    }
    return null;
  }

  public onReset() {
    this.submitted = true;
    if (this.formReset.valid) {
      const data = {
        requestId: this._resetCode,
        password: this.formReset.value.password
      }
      this.authService.resetPassword(data).subscribe(res => {

        this.showUpdatePasswordMassage = false;
      });
      
        setTimeout(()=>{
          this.showUpdatePasswordMassage = false; 
        }, 10000);
        
        this.router.navigate(['/login'])
    }
  }


  get f() { return this.formReset.controls; }

  get errors() {
    return this.formReset.errors;
  }
  openDialog(data: string): void {
    this.safeSrc = this.sanitizer.bypassSecurityTrustResourceUrl(data);
    const dialogRef = this.dialog.open(DialogOverviewExampleDialogComponent, {
      data: { safeSrc: this.safeSrc }
    });
    dialogRef.afterClosed().subscribe(result => { });
  }

  public togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }
  public toggleConfirmPasswordVisibility() {
    this.showConfirmPassword = !this.showConfirmPassword;
  }

}
