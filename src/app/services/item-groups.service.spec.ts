import { TestBed } from '@angular/core/testing';

import { ItemGroupsService } from './item-groups.service';

describe('ItemGroupsService', () => {
  let service: ItemGroupsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ItemGroupsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
