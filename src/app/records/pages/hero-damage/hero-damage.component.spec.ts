import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeroDamageComponent } from './hero-damage.component';

describe('HeroDamageComponent', () => {
  let component: HeroDamageComponent;
  let fixture: ComponentFixture<HeroDamageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeroDamageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeroDamageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
