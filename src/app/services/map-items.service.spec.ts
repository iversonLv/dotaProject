import { TestBed } from '@angular/core/testing';

import { MapItemsService } from './map-items.service';

describe('MapItemsService', () => {
  let service: MapItemsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MapItemsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
