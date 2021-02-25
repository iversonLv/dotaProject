import { TestBed } from '@angular/core/testing';

import { ItemColorService } from './item-color.service';

describe('ItemColorService', () => {
  let service: ItemColorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ItemColorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
