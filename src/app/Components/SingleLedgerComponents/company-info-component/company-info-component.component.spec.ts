import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyInfoComponentComponent } from './company-info-component.component';

describe('CompanyInfoComponentComponent', () => {
  let component: CompanyInfoComponentComponent;
  let fixture: ComponentFixture<CompanyInfoComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompanyInfoComponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanyInfoComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
