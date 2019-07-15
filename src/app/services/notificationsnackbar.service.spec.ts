import { TestBed } from '@angular/core/testing';

import { NotificationsnackbarService } from './notificationsnackbar.service';

describe('NotificationsnackbarService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NotificationsnackbarService = TestBed.get(NotificationsnackbarService);
    expect(service).toBeTruthy();
  });
});
