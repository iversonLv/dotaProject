import { TestBed } from '@angular/core/testing';

import { SideService } from './side.service';

describe('SideService', () => {
  let service: SideService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SideService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
