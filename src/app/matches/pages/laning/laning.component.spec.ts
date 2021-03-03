import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LaningComponent } from './laning.component';

describe('LaningComponent', () => {
  let component: LaningComponent;
  let fixture: ComponentFixture<LaningComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LaningComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LaningComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
