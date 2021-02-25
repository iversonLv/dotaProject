import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NavTitleComponent } from './nav-title.component';

describe('NavTitleComponent', () => {
  let component: NavTitleComponent;
  let fixture: ComponentFixture<NavTitleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NavTitleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavTitleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
