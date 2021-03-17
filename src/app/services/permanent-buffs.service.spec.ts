import { TestBed } from '@angular/core/testing';

import { PermanentBuffsService } from './permanent-buffs.service';

describe('PermanentBuffsService', () => {
  let service: PermanentBuffsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PermanentBuffsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
