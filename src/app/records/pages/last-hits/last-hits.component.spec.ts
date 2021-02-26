import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LastHitsComponent } from './last-hits.component';

describe('LastHitsComponent', () => {
  let component: LastHitsComponent;
  let fixture: ComponentFixture<LastHitsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LastHitsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LastHitsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
