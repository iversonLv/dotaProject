import { TestBed } from '@angular/core/testing';

import { LaneRoleService } from './lane-role.service';

describe('LaneRoleService', () => {
  let service: LaneRoleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LaneRoleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
