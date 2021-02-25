import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayersHeroComponent } from './players-hero.component';

describe('PlayersHeroComponent', () => {
  let component: PlayersHeroComponent;
  let fixture: ComponentFixture<PlayersHeroComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlayersHeroComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlayersHeroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
