import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DireComponent } from './dire.component';

describe('DireComponent', () => {
  let component: DireComponent;
  let fixture: ComponentFixture<DireComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DireComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
