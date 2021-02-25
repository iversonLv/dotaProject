import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamsHeroComponent } from './teams-hero.component';

describe('TeamsHeroComponent', () => {
  let component: TeamsHeroComponent;
  let fixture: ComponentFixture<TeamsHeroComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeamsHeroComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeamsHeroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
