import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FirstBloodModalComponent } from './first-blood-modal.component';

describe('FirstBloodModalComponent', () => {
  let component: FirstBloodModalComponent;
  let fixture: ComponentFixture<FirstBloodModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FirstBloodModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FirstBloodModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
