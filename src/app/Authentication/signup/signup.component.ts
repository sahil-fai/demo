import { Component, OnInit, ChangeDetectorRef, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth-service/auth.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {MediaMatcher} from '@angular/cdk/layout';
import { DialogOverviewExampleDialogComponent } from '../../Shared/dialog-overview-example-dialog/dialog-overview-example-dialog.component'
import { TermsConditionsComponent }  from '../../Shared/terms-conditions/terms-conditions.component'

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.less']
})
export class SignupComponent implements OnInit {
  public submitted:boolean;
  safeSrc: SafeResourceUrl;
  private _userEmail: string = '';
  public showPassword: boolean = false;
  isRegistered: boolean=false;
  checked = false;
  mobileQuery: MediaQueryList;
  private _mobileQueryListener: () => void;
  width: string;


  constructor(private router: Router, private _fb: FormBuilder,private authService:AuthService,  private sanitizer: DomSanitizer,public dialog: MatDialog, media: MediaMatcher, changeDetectorRef: ChangeDetectorRef) { 
    this.mobileQuery = media.matchMedia('(max-width: 767px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }
  
  formRegister: FormGroup;
  roles = [
    {value: 'CPA', viewValue: 'CPA'},
    {value: 'Business Owner', viewValue: 'Business Owner'},
    {value: 'Admin', viewValue: 'Adminstator'}
  ];
  ngOnInit() {
    this.createForm();
  }
  private createForm(){
    this.formRegister = this._fb.group({
      firstName: ['', [ Validators.required ]],
      lastName: ['', [ Validators.required ]],
      username: [this._userEmail, [ Validators.required, Validators.email ]],
      password: ['', [ Validators.required, Validators.minLength(6), this.hasNumber, this.hasUppercase, this.hasLowercase, this.hasSpecialCharacter ]],
      confirmpassword:['',''],
      isAgree: ['', [ Validators.requiredTrue ]],
      recaptcha: [null, [ Validators.required]],
      role: [null, [Validators.required]]
    });
  }
   //check for Numbers
  private hasNumber(control: AbstractControl): { [key: string]: boolean } | null {
    if (control.value && !(/\d/.test(control.value))) {
      return { 'number': true };
    }
    return null;
  }

  //check for Upper Case letters
  private hasUppercase(control: AbstractControl): { [key: string]: boolean } | null {
    if (control.value && !(/[A-Z]/.test(control.value))) {
      return { 'uppercase': true };
    }
    return null;
  }

  //check for Lower Case letters
  private hasLowercase(control: AbstractControl): { [key: string]: boolean } | null {
    if (control.value && !(/[a-z]/.test(control.value))) {
      return { 'lowercase': true };
    }
    return null;
  }

  //check for Special Characters
  private hasSpecialCharacter(control: AbstractControl): { [key: string]: boolean } | null {
    if (control.value && !(/[ !@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(control.value))) {
      return { 'specialcharacter': true };
    }
    return null;
  }
  public onRegister(){
    this.submitted = true;
    console.log(this.formRegister);
    if(this.formRegister.invalid){
      return;
      }
    this.authService.enroll(this.formRegister.value).subscribe(res => {
      this.isRegistered = true;
      this.router.navigate(['/dashboard']);
    }, err =>{

    });
  }
   public togglePasswordVisibility(){
    this.showPassword = !this.showPassword;
  }
   /* Login form validations */
  get f() { return this.formRegister.controls; }

  openVideo(data: string): void {
    this.safeSrc =  this.sanitizer.bypassSecurityTrustResourceUrl(data);
    const dialogRef = this.dialog.open(DialogOverviewExampleDialogComponent, {
      data: {safeSrc: this.safeSrc},
      width: '70%',
    });

    dialogRef.afterClosed().subscribe(result => {
     // console.log('The dialog was closed');
    });
  }
  openTermsConditions(){
    this.width=(this.mobileQuery.matches) ? '80vw' : '50vw';

    const dialogConfig = new MatDialogConfig();
       // dialogConfig.disableClose = true;
        dialogConfig.autoFocus = true;
        dialogConfig.width=this.width;
        dialogConfig.height='90%';
        dialogConfig.maxWidth="600px";
        dialogConfig.position = {
          'top': '50px'
        };
        dialogConfig.hasBackdrop=true;
        dialogConfig.panelClass="terms-conditions";
        dialogConfig.closeOnNavigation=true;

    const dialogRef = this.dialog.open(TermsConditionsComponent, dialogConfig);

 
    dialogRef.afterClosed().subscribe(
      data => this.checked=data
    );  

  }
  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

}
