import { Component, OnInit, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../services/auth-service/auth.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MediaMatcher } from '@angular/cdk/layout';
import { DialogOverviewExampleDialogComponent } from '../../Shared/dialog-overview-example-dialog/dialog-overview-example-dialog.component';
import { TermsConditionsComponent } from '../../Shared/terms-conditions/terms-conditions.component';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.less']
})
export class SignupComponent implements OnInit, OnDestroy {
  public submitted: boolean;
  safeSrc: SafeResourceUrl;
  private userEmail = '';
  public showPassword = false;
  public showConfirmPassword = false;
  isRegistered = false;
  checked = false;
  mobileQuery: MediaQueryList;
  private mobileQueryListener: () => void;
  width: string;
  verifyInviteRes: any;
  showInvalidPage: boolean = true;
  invitetype: string;
  invitecompanyid: string;
  inviteuserid: string;
  protected aFormGroup: FormGroup;
  constructor(private router: Router, private route: ActivatedRoute,private fb: FormBuilder, private authService: AuthService, private sanitizer: DomSanitizer, public dialog: MatDialog, media: MediaMatcher, changeDetectorRef: ChangeDetectorRef) {
    this.mobileQuery = media.matchMedia('(max-width: 767px)');
    this.mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this.mobileQueryListener);
  }
  formRegister: FormGroup;
  roles = [{
      value: 'cpa',
      viewValue: 'CPA'
    },
    {
      value: 'businessowner',
      viewValue: 'Business Owner'
    },
    {
      value: 'accountant',
      viewValue: 'accountant'
    }
  ];
  ngOnInit() {
    // let data = {
    //   invitetype : this.route.snapshot.queryParams.invitetype,
    //   invitecompanyid : this.route.snapshot.queryParams.invitecompanyid,
    //   inviteuserid : this.route.snapshot.queryParams.inviteuserid
    // };
    // this.aFormGroup = this.fb.group({
    //   recaptcha: ['', Validators.required]
    // });


    if(this.route.snapshot.queryParams.requestId) {

      this.authService.verifyInvite(Number(this.route.snapshot.queryParams.requestId)).subscribe(res => {
      if(res.status) {
        this.invitetype = res.source;
        this.invitecompanyid = res.companyid;
        this.inviteuserid = res.userid;
      } else {
        this.showInvalidPage = false;
        this.verifyInviteRes = res;
      }
      });
    }
    this.createForm();


  }
  private createForm() {
    this.formRegister = this.fb.group({
      firstName: ['', [Validators.required]],
      lastName: [''],
      username: [this.userEmail, [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6), this.hasNumber, this.hasUppercase, this.hasLowercase, this.hasSpecialCharacter]],
      confirmpassword: ['', [Validators.required, Validators.minLength(6), this.hasNumber, this.hasUppercase, this.hasLowercase, this.hasSpecialCharacter]],
      isAgree: ['', [Validators.requiredTrue]],
      recaptcha: [''],
      role: [null, [Validators.required]]
    }, {
      validator: this.checkPasswords
    });
  }

  public handleSuccess(event)
  {

  }
  // check for Numbers
  private hasNumber(control: AbstractControl): {
    [key: string]: boolean
  } | null {
    if (control.value && !(/\d/.test(control.value))) {
      return {
        number: true
      };
    }
    return null;
  }

  // check for Upper Case letters
  private hasUppercase(control: AbstractControl): {
    [key: string]: boolean
  } | null {
    if (control.value && !(/[A-Z]/.test(control.value))) {
      return {
        uppercase: true
      };
    }
    return null;
  }

  // check for Lower Case letters
  private hasLowercase(control: AbstractControl): {
    [key: string]: boolean
  } | null {
    if (control.value && !(/[a-z]/.test(control.value))) {
      return {
        lowercase: true
      };
    }
    return null;
  }

  // check for Special Characters
  private hasSpecialCharacter(control: AbstractControl): {
    [key: string]: boolean
  } | null {
    if (control.value && !(/[ !@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(control.value))) {
      return {
        specialcharacter: true
      };
    }
    return null;
  }
  public onRegister() {
    this.submitted = true;
    // if (this.formRegister.invalid) {
    //   return;
    // }
    // if(this.verifyInviteRes.status) {
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
        // inviteuserid: this.inviteuserid ? this.inviteuserid.toString() : undefined
        requestId: this.inviteuserid ? this.inviteuserid.toString() : undefined
      }
      this.authService.enroll(data).subscribe(res => {
        this.isRegistered = true;
        this.router.navigate(['/login']);
      });
    }

    // }



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

    dialogRef.afterClosed().subscribe(result => {
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
  openTermsConditions() {
    this.width = '90vw';
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.width = this.width;
    dialogConfig.height = '90%';
    dialogConfig.maxWidth = '600px';
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

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this.mobileQueryListener);
  }

}
