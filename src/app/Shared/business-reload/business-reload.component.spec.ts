import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BusinessReloadComponent } from './business-reload.component';

describe('BusinessReloadComponent', () => {
  let component: BusinessReloadComponent;
  let fixture: ComponentFixture<BusinessReloadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BusinessReloadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BusinessReloadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
