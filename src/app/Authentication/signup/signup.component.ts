import {
  Component,
  OnInit,
  ChangeDetectorRef,
  Input,
  OnDestroy
} from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  AbstractControl
} from '@angular/forms';
import {
  Router
} from '@angular/router';
import {
  AuthService
} from '../../services/auth-service/auth.service';
import {
  DomSanitizer,
  SafeResourceUrl
} from '@angular/platform-browser';
import {
  MatDialog,
  MatDialogConfig
} from '@angular/material/dialog';
import {
  MediaMatcher
} from '@angular/cdk/layout';
import {
  DialogOverviewExampleDialogComponent
} from '../../Shared/dialog-overview-example-dialog/dialog-overview-example-dialog.component'
import {
  TermsConditionsComponent
} from '../../Shared/terms-conditions/terms-conditions.component'

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
  private _mobileQueryListener: () => void;
  width: string;

  // tslint:disable-next-line: max-line-length
  constructor(private router: Router, private _fb: FormBuilder, private authService: AuthService, private sanitizer: DomSanitizer, public dialog: MatDialog, media: MediaMatcher, changeDetectorRef: ChangeDetectorRef) {
    this.mobileQuery = media.matchMedia('(max-width: 767px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }
  formRegister: FormGroup;
  roles = [{
      value: 'CPA',
      viewValue: 'CPA'
    },
    {
      value: 'Business Owner',
      viewValue: 'Business Owner'
    },
    {
      value: 'Admin',
      viewValue: 'Adminstator'
    }
  ];
  ngOnInit() {
    this.createForm();
  }
  private createForm() {
    this.formRegister = this._fb.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      username: [this.userEmail, [Validators.required, Validators.email]],
      // tslint:disable-next-line: max-line-length
      password: ['', [Validators.required, Validators.minLength(6), this.hasNumber, this.hasUppercase, this.hasLowercase, this.hasSpecialCharacter]],
      // tslint:disable-next-line: max-line-length
      confirmpassword: ['', [Validators.required, Validators.minLength(6), this.hasNumber, this.hasUppercase, this.hasLowercase, this.hasSpecialCharacter]],
      isAgree: ['', [Validators.requiredTrue]],
      // recaptcha: [null, [ Validators.required]],
      //  recaptcha: ['', '',],
      role: [null, [Validators.required]]
    }, {
      validator: this.checkPasswords
    });
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
    if (this.formRegister.invalid) {
      return;
    }
    this.authService.enroll(this.formRegister.value).subscribe(res => {
      this.isRegistered = true;
      this.router.navigate(['/login']);
    }, err => {

    });
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
      // console.log('The dialog was closed');
    });
  }
  public checkPasswords(group: FormGroup) {
    if (group.controls) {
      let pass = group.controls.password.value;
      let confirmPass = group.controls.confirmpassword.value;
      return pass === confirmPass ? null : {
        notSame: true
      }
    }
    // }
    // return null;
  }
  openTermsConditions() {
    this.width = (this.mobileQuery.matches) ? '80vw' : '50vw';

    const dialogConfig = new MatDialogConfig();
    // dialogConfig.disableClose = true;
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
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

}
