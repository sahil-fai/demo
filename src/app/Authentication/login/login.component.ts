import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth-service/auth.service';
import { HelperService } from '../../services/helper-service/helper.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { MatDialog } from '@angular/material/dialog';
import { DialogOverviewExampleDialogComponent } from '../../Shared/dialog-overview-example-dialog/dialog-overview-example-dialog.component'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less']
})
export class LoginComponent implements OnInit {
  safeSrc: SafeResourceUrl;
  private _subscribeFormControls: any;
  public submitted = false;

  constructor(private router: Router, private _fb: FormBuilder,private authService:AuthService, private helper: HelperService, private sanitizer: DomSanitizer,public dialog: MatDialog) { }

  formLogin: FormGroup;

  ngOnInit() {
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
      console.log(res);
        this.helper.set(res.token);
        this.router.navigate(['/business/company-info']);
        if (res['Role'] === 0) {
          this.router.navigate(['/business/company-info']);
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

}

