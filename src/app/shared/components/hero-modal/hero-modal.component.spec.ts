import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeroModalComponent } from './hero-modal.component';

describe('HeroModalComponent', () => {
  let component: HeroModalComponent;
  let fixture: ComponentFixture<HeroModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeroModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeroModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
