import { TestBed } from '@angular/core/testing';

import { ChatWheelService } from './chat-wheel.service';

describe('ChatWheelService', () => {
  let service: ChatWheelService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChatWheelService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
