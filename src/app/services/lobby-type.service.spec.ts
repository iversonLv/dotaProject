import { TestBed } from '@angular/core/testing';

import { LobbyTypeService } from './lobby-type.service';

describe('LobbyTypeService', () => {
  let service: LobbyTypeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LobbyTypeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
