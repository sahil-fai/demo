import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth-service/auth.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import {MatDialog} from '@angular/material/dialog';
import { DialogOverviewExampleDialogComponent } from '../../Shared/dialog-overview-example-dialog/dialog-overview-example-dialog.component'

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.less']
})
export class SignupComponent implements OnInit {
  public submitted:boolean;
  safeSrc: SafeResourceUrl;
  constructor(private router: Router, private _fb: FormBuilder,private authService:AuthService,  private sanitizer: DomSanitizer,public dialog: MatDialog) { }
  formRegister: FormGroup;
  roles = [
    {value: 'CPA', viewValue: 'CPA'},
    {value: 'Business Owner', viewValue: 'Business Owner'}
  ];
  ngOnInit() {
    this.createForm();
  }
  private createForm(){
    this.formRegister = this._fb.group({
      firstName: ['', [ Validators.required ]],
      lastName: ['', [ Validators.required ]],
      username: ['', [ Validators.required, Validators.email ]],
      password: ['', [ Validators.required, Validators.minLength(6)]],
      isAgree: ['', [ Validators.requiredTrue ]],
      role: [null, [Validators.required]]
    });
  }
  public onRegister(){
    this.submitted = true;
    if(this.formRegister.invalid){return;}
    this.authService.enroll(this.formRegister.value).subscribe(res => {
      console.log(res);
     // this.isRegistered = true;
      this.router.navigate(['/dashboard']);
    }, err =>{

    });
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

}
