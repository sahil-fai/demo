import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleLedgerBusinessListComponent } from './single-ledger-business-list.component';

describe('SingleLedgerBusinessListComponent', () => {
  let component: SingleLedgerBusinessListComponent;
  let fixture: ComponentFixture<SingleLedgerBusinessListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SingleLedgerBusinessListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SingleLedgerBusinessListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
