import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeroAttrAgiComponent } from './hero-attr-agi.component';

describe('HeroAttrAgiComponent', () => {
  let component: HeroAttrAgiComponent;
  let fixture: ComponentFixture<HeroAttrAgiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeroAttrAgiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeroAttrAgiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
