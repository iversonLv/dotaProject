import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayersNavComponent } from './players-nav.component';

describe('PlayersNavComponent', () => {
  let component: PlayersNavComponent;
  let fixture: ComponentFixture<PlayersNavComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlayersNavComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlayersNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
