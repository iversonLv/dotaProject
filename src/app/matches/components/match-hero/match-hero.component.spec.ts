import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MatchHeroComponent } from './match-hero.component';

describe('MatchHeroComponent', () => {
  let component: MatchHeroComponent;
  let fixture: ComponentFixture<MatchHeroComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MatchHeroComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MatchHeroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
