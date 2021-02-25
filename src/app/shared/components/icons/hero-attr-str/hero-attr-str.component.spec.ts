import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeroAttrStrComponent } from './hero-attr-str.component';

describe('HeroAttrStrComponent', () => {
  let component: HeroAttrStrComponent;
  let fixture: ComponentFixture<HeroAttrStrComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeroAttrStrComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeroAttrStrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
