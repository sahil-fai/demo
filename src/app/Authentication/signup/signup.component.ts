import { Component, OnInit, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../services/auth-service/auth.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MediaMatcher } from '@angular/cdk/layout';
import { DialogOverviewExampleDialogComponent } from '../../Shared/dialog-overview-example-dialog/dialog-overview-example-dialog.component';
import { TermsConditionsComponent } from '../../Shared/terms-conditions/terms-conditions.component';
import { ErrorHandlerService } from 'src/app/services/error-handler-service/error-handler.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.less']
})
export class SignupComponent implements OnInit, OnDestroy {
  public submitted: boolean;
  safeSrc: SafeResourceUrl;
  public showPassword = false;
  public showConfirmPassword = false;
  isRegistered = false;
  checked = false;
  mobileQuery: MediaQueryList;
  private mobileQueryListener: () => void;
  width: string;
  requestid: string;
  verifyInviteRes: any;
  showInvalidPage: string;
  invitetype: string;
  invitecompanyid: string;
  inviteuserid: string;
  captchaSiteKey: string;
  formRegister: FormGroup;
  roles = [
    {
      value: 'accountant',
      viewValue: 'Accountant'
    },
    {
      value: 'businessowner',
      viewValue: 'Business Owner'
    },
    {
      value: 'other',
      viewValue: 'Other'
    }
  ];

  constructor(private router: Router, private route: ActivatedRoute,private fb: FormBuilder, private authService: AuthService, private sanitizer: DomSanitizer, public dialog: MatDialog, 
    media: MediaMatcher, changeDetectorRef: ChangeDetectorRef, private _errHandler: ErrorHandlerService) {
    this.mobileQuery = media.matchMedia('(max-width: 767px)');
    this.mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this.mobileQueryListener);
  }

  ngOnInit() {
    // Enable captcha for local with test site key
    if(location.origin.indexOf('localhost') > 0) {
      this.captchaSiteKey = '6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI';
    } else {
      this.captchaSiteKey = '6LdE6c8UAAAAAMN2BRGwbzIEQLh2UwviTtyNZY30';
    }
    // Case of Sign up from invite link
    if(this.route.snapshot.queryParams.requestId) {
      this.requestid= this.route.snapshot.queryParams.requestId
      this.authService.verifyInvite(Number(this.route.snapshot.queryParams.requestId)).subscribe(res => {
      if(res.status) { 
        this.invitetype = res.source;
        this.invitecompanyid = res.companyid;
        this.inviteuserid = res.userid;
        this.showInvalidPage = 'signup';
      } else {
        this.showInvalidPage = 'invalidMessage';
        this.verifyInviteRes = res;
      }
      });
    } else {
      this.showInvalidPage = 'signup';
    }
    
    // Case of Sign up invitation from Paypie account
    if(this.route.snapshot.params.invitetype) { 
      this.invitetype = this.route.snapshot.params.invitetype;
      this.invitecompanyid = this.route.snapshot.params.invitecompanyid;
      this.inviteuserid = this.route.snapshot.params.inviteuserid;
    };

    this.createForm();
  }

  private createForm() {
    this.formRegister = this.fb.group({
      firstName: ['', [Validators.required]],
      lastName: [''],
      username: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6), this.hasNumber, this.hasUppercase, this.hasLowercase, this.hasSpecialCharacter]],
      confirmpassword: ['', [Validators.required, Validators.minLength(6), this.hasNumber, this.hasUppercase, this.hasLowercase, this.hasSpecialCharacter]],
      isAgree: ['', [Validators.requiredTrue]],
      recaptcha: ['', [Validators.required]],
      role: [null, [Validators.required]]
    }, {
      validator: this.checkPasswords
    });
  }

 
  // check for Numbers
  private hasNumber(control: AbstractControl): { [key: string]: boolean } | null {
    if (control.value && !(/\d/.test(control.value))) {
      return {
        number: true
      };
    }
    return null;
  }

  // check for Upper Case letters
  private hasUppercase(control: AbstractControl): { [key: string]: boolean } | null {
    if (control.value && !(/[A-Z]/.test(control.value))) {
      return {
        uppercase: true
      };
    }
    return null;
  }

  // check for Lower Case letters
  private hasLowercase(control: AbstractControl): { [key: string]: boolean } | null {
    if (control.value && !(/[a-z]/.test(control.value))) {
      return {
        lowercase: true
      };
    }
    return null;
  }

  // check for Special Characters
  private hasSpecialCharacter(control: AbstractControl): { [key: string]: boolean } | null {
    if (control.value && !(/[ !@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(control.value))) {
      return {
        specialcharacter: true
      };
    }
    return null;
  }

  public onRegister() {
    this.submitted = true;
    if (this.formRegister.valid) {
        const data = {
          email: this.formRegister.value.username,
          lastname: this.formRegister.value.lastName,
          password: this.formRegister.value.password,
          firstName: this.formRegister.value.firstName,
          roleType: this.formRegister.value.role,
          inviteby: this.formRegister.value.inviteby,
          invitetype: this.invitetype,
          invitecompanyid: this.invitecompanyid ? this.invitecompanyid.toString() : undefined,
          inviteuserid: this.inviteuserid ? this.inviteuserid.toString() : undefined,
          requestId: this.requestid ? this.requestid.toString() : undefined
        }
      this.authService.enroll(data).subscribe(res => {
        this.isRegistered = true;
        this.router.navigate(['/login']);
      }, err => {
        this._errHandler.pushError(err.error.message)
      });
    }
  }

  public togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  public toggleConfirmPasswordVisibility() {
    this.showConfirmPassword = !this.showConfirmPassword;
  }

  /* Login form validations */
  get f() {
    return this.formRegister.controls;
  }

  get errors() {
    return this.formRegister.errors;
  }

  openVideo(data: string): void {
    this.safeSrc = this.sanitizer.bypassSecurityTrustResourceUrl(data);
    const dialogRef = this.dialog.open(DialogOverviewExampleDialogComponent, {
      data: {
        safeSrc: this.safeSrc
      },
      width: '70%',
    });
    dialogRef.afterClosed().subscribe(() => {  });
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

  openTermsConditions() {
    this.width = '90vw';
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.width = this.width;
    dialogConfig.height = '90%';
    dialogConfig.maxWidth = '700px';
    dialogConfig.position = {
      top: '50px'
    };
    dialogConfig.hasBackdrop = true;
    dialogConfig.panelClass = 'terms-conditions';
    dialogConfig.closeOnNavigation = true;
    const dialogRef = this.dialog.open(TermsConditionsComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(
      data => this.checked = data
    );
  }

  ngOnDestroy() {
    this.mobileQuery.removeListener(this.mobileQueryListener);
  }

}
