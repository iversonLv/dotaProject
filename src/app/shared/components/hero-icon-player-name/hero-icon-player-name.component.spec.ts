import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeroIconPlayerNameComponent } from './hero-icon-player-name.component';

describe('HeroIconPlayerNameComponent', () => {
  let component: HeroIconPlayerNameComponent;
  let fixture: ComponentFixture<HeroIconPlayerNameComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeroIconPlayerNameComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeroIconPlayerNameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
