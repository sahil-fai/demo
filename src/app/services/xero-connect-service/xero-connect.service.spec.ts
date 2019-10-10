import { TestBed } from '@angular/core/testing';

import { XeroConnectService } from './xero-connect.service';

describe('XeroConnectService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: XeroConnectService = TestBed.get(XeroConnectService);
    expect(service).toBeTruthy();
  });
});
