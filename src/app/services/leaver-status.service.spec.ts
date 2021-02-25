import { TestBed } from '@angular/core/testing';

import { LeaverStatusService } from './leaver-status.service';

describe('LeaverStatusService', () => {
  let service: LeaverStatusService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LeaverStatusService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
