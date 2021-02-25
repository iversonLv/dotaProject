import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeroesHeroComponent } from './heroes-hero.component';

describe('HeroesHeroComponent', () => {
  let component: HeroesHeroComponent;
  let fixture: ComponentFixture<HeroesHeroComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeroesHeroComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeroesHeroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
