import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BillsComponentComponent } from './bills-component.component';

describe('BillsComponentComponent', () => {
  let component: BillsComponentComponent;
  let fixture: ComponentFixture<BillsComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BillsComponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BillsComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
