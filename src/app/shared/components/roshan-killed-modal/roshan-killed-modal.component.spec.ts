import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RoshanKilledModalComponent } from './roshan-killed-modal.component';

describe('RoshanKilledModalComponent', () => {
  let component: RoshanKilledModalComponent;
  let fixture: ComponentFixture<RoshanKilledModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RoshanKilledModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RoshanKilledModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
