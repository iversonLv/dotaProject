import { TestBed } from '@angular/core/testing';

import { ItemIdsService } from './item-ids.service';

describe('ItemIdsService', () => {
  let service: ItemIdsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ItemIdsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
