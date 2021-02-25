import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeroAttrIntComponent } from './hero-attr-int.component';

describe('HeroAttrIntComponent', () => {
  let component: HeroAttrIntComponent;
  let fixture: ComponentFixture<HeroAttrIntComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeroAttrIntComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeroAttrIntComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
