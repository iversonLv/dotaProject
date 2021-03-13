import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RadientComponent } from './radient.component';

describe('RadientComponent', () => {
  let component: RadientComponent;
  let fixture: ComponentFixture<RadientComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RadientComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RadientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
