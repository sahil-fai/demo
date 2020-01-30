import { Component, OnInit, ViewChild, ElementRef, OnChanges, AfterViewInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth-service/auth.service';
import { HelperService } from '../../services/helper-service/helper.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { MatDialog } from '@angular/material/dialog';
import { DialogOverviewExampleDialogComponent } from '../../Shared/dialog-overview-example-dialog/dialog-overview-example-dialog.component';
import { NotificationsnackbarService } from '../../services/notificationsnackbar.service'
import { Subscription } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ErrorHandlerService } from 'src/app/services/error-handler-service/error-handler.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less']
})
export class LoginComponent implements OnInit, OnChanges, AfterViewInit {
  safeSrc: SafeResourceUrl;
  private _subscribeFormControls: any;
  public submitted = false;
  public showPassword:boolean = false;
  public notificationserveice: Subscription;
  public message: any = 'Successfully login';
  @ViewChild('email', { static: true }) private elementRef: ElementRef;

  // tslint:disable-next-line: max-line-length
  constructor(private router: Router, private _fb: FormBuilder,private _errHandler: ErrorHandlerService, private authService: AuthService, private helper: HelperService, private sanitizer: DomSanitizer, public dialog: MatDialog, private notification: NotificationsnackbarService, private snackBar: MatSnackBar) { }

  formLogin: FormGroup;

  ngOnInit() {
    localStorage.clear();
    this.createForm();
    this._subscribeFormControls = this.formLogin.controls.username.valueChanges.subscribe(val => {
      if (val.indexOf(' ') >= 0) {
       // this.formLogin.controls['username'].setValue(this.helper.removeEmptySpaces(val));
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
        
       if (res===null)
       {
         this.router.navigate(['/login'])
         console.log(res);
         return;
       }

        this.helper.userInfo.set(res.user);
        this.helper.set(res.token);
        this.router.navigate(['/businesslist']);       
    },
    err =>  {
      if (err.status === 401)
      {
        this._errHandler.pushError("Invalid Credentials")
      }
     else if (err.status === 404)
      {

      }
      else {
         this._errHandler.pushError(err.message)
        }
      
      this.formLogin.patchValue({password: ''});
    }
    );
  }
  get f() {
    return this.formLogin.controls;
  }
  openDialog(data: string): void {
    this.safeSrc =  this.sanitizer.bypassSecurityTrustResourceUrl(data);
    const dialogRef = this.dialog.open(DialogOverviewExampleDialogComponent, {
      data: {safeSrc: this.safeSrc}
    });

    dialogRef.afterClosed().subscribe(result => {
     // console.log('The dialog was closed');
    });
  }
  ngOnChanges(): void {
    console.log(this.formLogin);
  }
  ngAfterViewInit(): void {
    this.elementRef.nativeElement.focus();
}
  public togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }
}
