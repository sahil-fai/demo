import { Component, OnInit } from '@angular/core';
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

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less']
})
export class LoginComponent implements OnInit {
  safeSrc: SafeResourceUrl;
  private _subscribeFormControls: any;
  public submitted = false;
  public showPassword:boolean = false;
  public notificationserveice: Subscription;
  public message: any="Successfully login";

  constructor(private router: Router, private _fb: FormBuilder,private authService:AuthService, private helper: HelperService, private sanitizer: DomSanitizer,public dialog: MatDialog, private notification: NotificationsnackbarService, private snackBar: MatSnackBar) { }

  formLogin: FormGroup;

  ngOnInit() {
    localStorage.clear();
    this.createForm();
    this._subscribeFormControls = this.formLogin.controls['username'].valueChanges.subscribe(val => {
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
        // this.notificationserveice= this.notification.snackbarState.subscribe(
        //   this.message="Successfully login";
        // )
        // this.notification.notification$.subscribe(message => {
        //   this.snackBar.open(message);
        // });
        this.snackBar.open(this.message);
        //   this.snackBar.open(this.message,{
        //     duration: 2000
        //  });
      this.notification.openSnackBar(this.message,'✌✌️✌️');
        this.helper.set(res.token);
        this.helper.setuserId(res.user.id);
        this.router.navigate(['/businesslist']);
        if (res['Role'] === 0) {
          this.router.navigate(['/businesslist']);
        }
    },
    err =>  {
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
  public togglePasswordVisibility(){
    this.showPassword = !this.showPassword;
  }
}

