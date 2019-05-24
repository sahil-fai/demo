import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.less']
})
export class SignupComponent implements OnInit {
  public submitted:boolean;
  constructor(private router: Router, private _fb: FormBuilder,private authService:AuthService) { }
  formRegister: FormGroup;
  ngOnInit() {
    this.createForm();
  }
  private createForm(){
    this.formRegister = this._fb.group({
      firstName: ['', [ Validators.required ]],
      lastName: ['', [ Validators.required ]],
      username: [this._userEmail, [ Validators.required, Validators.email ]],
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
      this.isRegistered = true; 
      this.router.navigate(['/dashboard']);
    }, err =>{

    });
  }

}
