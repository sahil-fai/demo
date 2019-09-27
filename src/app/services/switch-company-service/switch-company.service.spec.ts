import { TestBed, inject } from '@angular/core/testing';

import { SwitchCompanyService } from './switch-company.service';

describe('SwitchCompanyService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SwitchCompanyService]
    });
  });

  it('should be created', inject([SwitchCompanyService], (service: SwitchCompanyService) => {
    expect(service).toBeTruthy();
  }));
});
