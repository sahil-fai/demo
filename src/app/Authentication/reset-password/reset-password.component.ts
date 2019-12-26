import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, Validators, AbstractControl, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth-service/auth.service';
import { MatDialog, MatSnackBar } from '@angular/material';
import { NotificationsnackbarService } from 'src/app/services/notificationsnackbar.service';
import { HelperService } from 'src/app/services/helper-service/helper.service';
import { DomSanitizer } from '@angular/platform-browser';
import { DialogOverviewExampleDialogComponent } from 'src/app/Shared/dialog-overview-example-dialog/dialog-overview-example-dialog.component';
@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.less']
})
export class ResetPasswordComponent implements OnInit {
  // tslint:disable-next-line: variable-name
  private _username: string;
  // tslint:disable-next-line: variable-name
  private _resetCode: string;

  // tslint:disable-next-line: no-input-rename
  @Input('role') public role: number;
  public submitted = false;

  public showPassword: boolean = false;
  _authService: any;
  _router: any;
  safeSrc: any;


  // tslint:disable-next-line: max-line-length
  // tslint:disable-next-line: variable-name
  // tslint:disable-next-line: max-line-length
  constructor(private router: Router, private route:ActivatedRoute, private _fb: FormBuilder, private authService: AuthService, private helper: HelperService, private sanitizer: DomSanitizer, public dialog: MatDialog, private notification: NotificationsnackbarService, private snackBar: MatSnackBar) { }
  formReset: FormGroup;
  ngOnInit() {
    this._resetCode= this.route.snapshot.queryParams.requestid,
    this.createForm();
  }
  private createForm(){
    this.formReset = this._fb.group({
      password: ['', [Validators.required, Validators.minLength(6), this.hasNumber, this.hasUppercase, this.hasLowercase, this.hasSpecialCharacter]],
      confirmpassword: ['', [Validators.required, Validators.minLength(6), this.hasNumber, this.hasUppercase, this.hasLowercase, this.hasSpecialCharacter]],
      requestid:[this._resetCode, [Validators.required]]
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

  public onReset(){
    const self= this;
    this.submitted = true;
    if(this.formReset.invalid){return;}
    //console.log('Forgot form: ', this.formReset.value);
    this.authService.resetPassword(this.formReset.value).subscribe(res => {
      console.log('result : ', res);
      self.router.navigate(['/login'])
    },()=>{
      self.router.navigate(['/login'])
    });
  
  }
  
  
  get f() { return this.formReset.controls;}


  openDialog(data: string): void {
    this.safeSrc =  this.sanitizer.bypassSecurityTrustResourceUrl(data);
    const dialogRef = this.dialog.open(DialogOverviewExampleDialogComponent, {
      data: {safeSrc: this.safeSrc}
    });

    dialogRef.afterClosed().subscribe(result => {
     // console.log('The dialog was closed');
    });
  }
}
