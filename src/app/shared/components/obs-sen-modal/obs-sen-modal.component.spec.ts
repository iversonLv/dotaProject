import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ObsSenModalComponent } from './obs-sen-modal.component';

describe('ObsSenModalComponent', () => {
  let component: ObsSenModalComponent;
  let fixture: ComponentFixture<ObsSenModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ObsSenModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ObsSenModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
