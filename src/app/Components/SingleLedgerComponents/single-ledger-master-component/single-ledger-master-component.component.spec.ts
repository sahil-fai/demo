import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleLedgerMasterComponentComponent } from './single-ledger-master-component.component';

describe('SingleLedgerMasterComponentComponent', () => {
  let component: SingleLedgerMasterComponentComponent;
  let fixture: ComponentFixture<SingleLedgerMasterComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SingleLedgerMasterComponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SingleLedgerMasterComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
