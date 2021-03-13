import { TestBed } from '@angular/core/testing';

import { PlayerColorService } from './player-color.service';

describe('PlayerColorService', () => {
  let service: PlayerColorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PlayerColorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
