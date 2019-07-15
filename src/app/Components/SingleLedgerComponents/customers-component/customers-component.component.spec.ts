import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerSComponentComponent } from './customers-component.component';

describe('CustomerSComponentComponent', () => {
  let component: CustomerSComponentComponent;
  let fixture: ComponentFixture<CustomerSComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomerSComponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerSComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
