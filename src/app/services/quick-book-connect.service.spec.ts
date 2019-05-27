import { TestBed } from '@angular/core/testing';

import { QuickBookConnectService } from './quick-book-connect.service';

describe('QuickBookConnectService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: QuickBookConnectService = TestBed.get(QuickBookConnectService);
    expect(service).toBeTruthy();
  });
});
