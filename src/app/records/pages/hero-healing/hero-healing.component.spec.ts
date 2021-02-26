import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeroHealingComponent } from './hero-healing.component';

describe('HeroHealingComponent', () => {
  let component: HeroHealingComponent;
  let fixture: ComponentFixture<HeroHealingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeroHealingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeroHealingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
