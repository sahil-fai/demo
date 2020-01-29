import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResetForgetPasswordComponent } from './reset-password.component';

describe('ResetPasswordComponent', () => {
  let component: ResetForgetPasswordComponent;
  let fixture: ComponentFixture<ResetForgetPasswordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResetForgetPasswordComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResetForgetPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
