import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { XpPerMinComponent } from './xp-per-min.component';

describe('XpPerMinComponent', () => {
  let component: XpPerMinComponent;
  let fixture: ComponentFixture<XpPerMinComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ XpPerMinComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(XpPerMinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
